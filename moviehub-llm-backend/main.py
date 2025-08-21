from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import json
import logging
import os
import time
from sqlalchemy import Column, Integer, Text, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import OperationalError

# -----------------------
# Logging
# -----------------------
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# -----------------------
# FastAPI setup
# -----------------------
app = FastAPI()

# --- CORS ---
origins = [
    "http://localhost:3000",  # Vite dev
    "http://moviehub-frontend-container:80",  # Frontend în container
    "http://localhost",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # sau ["*"] doar pentru test rapid
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------
# Models
# -----------------------
class ChatRequest(BaseModel):
    prompt: str

class ChatResponse(BaseModel):
    id: int
    response: str

# -----------------------
# Database setup robust
# -----------------------
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://moviehub_user:moviehub_pass@db:5432/moviehub")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Post(Base):
    __tablename__ = "posts"
    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text, nullable=False)
    llm_response = Column(Text, nullable=False)

# Retry până DB-ul răspunde
max_attempts = 30  # Increase retry attempts
retry_delay = 5    # Increase delay between retries (in seconds)

for attempt in range(max_attempts):
    try:
        engine.connect()
        logger.info("Database is ready!")
        break
    except OperationalError:
        logger.warning(f"Database not ready yet, retrying ({attempt+1}/{max_attempts})...")
        time.sleep(retry_delay)
else:
    logger.error("Could not connect to the database after several attempts.")
    raise RuntimeError("Database connection failed.")

# Crează tabelele după ce DB-ul e gata
Base.metadata.create_all(bind=engine)
logger.info("Tables are created or already exist.")

# Dependency pentru sesiunea DB
def get_db():
    logger.debug("Creating a new database session...")
    db = SessionLocal()
    try:
        yield db
    finally:
        logger.debug("Closing the database session...")
        db.close()

# -----------------------
# Ollama API
# -----------------------
OLLAMA_URL = os.getenv("OLLAMA_URL", "http://host.docker.internal:11434/api/chat")

# -----------------------
# Routes
# -----------------------
@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest, db: SessionLocal = Depends(get_db)):
    logger.debug(f"Received chat request with prompt: {request.prompt}")
    payload = {
        "model": "gemma3:1b",
        "messages": [
            {
                "role": "system",
                "content": "You are a sad movie critic, but you write your reviews like social media comments. Avoid describing physical movements or stage directions. Keep it written like a post someone would leave under a video or article: short paragraphs, heavy with emotion, weary tone, but no '(sighs)' or stage actions."
            },
            {"role": "user", "content": request.prompt}
        ]
    }

    logger.debug(f"Sending request to {OLLAMA_URL} with payload: {payload}")

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            logger.debug(f"Sending payload to Ollama API: {payload}")
            async with client.stream("POST", OLLAMA_URL, json=payload) as response:
                if response.status_code != 200:
                    text = await response.aread()
                    logger.error(f"Error from Ollama API: {text.decode()}")
                    raise HTTPException(status_code=response.status_code, detail="Error from Ollama API")

                final_response = ""
                async for line in response.aiter_lines():
                    if line.strip():
                        logger.debug(f"Received response line: {line.strip()}")
                        try:
                            json_data = json.loads(line)
                            logger.debug(f"Received line: {json_data}")
                            if "message" in json_data and "content" in json_data["message"]:
                                final_response += json_data["message"]["content"]
                        except json.JSONDecodeError:
                            logger.error(f"Failed to parse line: {line}")
                            continue

        if not final_response:
            logger.error("Final response is empty after processing all lines.")
            raise HTTPException(status_code=500, detail="Empty response from Ollama API")

        logger.debug(f"Final response from Ollama API: {final_response}")

        # Save post and response to database
        try:
            logger.debug("Attempting to save the post to the database...")
            new_post = Post(content=request.prompt, llm_response=final_response.strip())
            db.add(new_post)
            db.commit()
            db.refresh(new_post)
            logger.info(f"Post saved successfully with ID: {new_post.id}")
        except Exception as db_error:
            logger.error(f"Database error occurred: {db_error}")
            db.rollback()
            raise HTTPException(status_code=500, detail="Failed to save to database")

        return {"id": new_post.id, "response": final_response.strip()}

    except httpx.RequestError as req_error:
        logger.error(f"Request error occurred: {req_error}")
        raise HTTPException(status_code=500, detail="Failed to connect to Ollama API")
    except Exception as e:
        logger.exception(f"Unexpected error occurred: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# -----------------------
# Run server
# -----------------------
if __name__ == "__main__":
    import uvicorn
    logger.info("Starting FastAPI server...")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
