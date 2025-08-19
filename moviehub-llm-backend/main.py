from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import httpx
import json
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = FastAPI()

class ChatRequest(BaseModel):
    prompt: str

class ChatResponse(BaseModel):
    response: str

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    url = "http://localhost:11434/api/chat"
    payload = {
    "model": "gemma3:1b",
    "messages": [
        {"role": "system", "content": "You are a sad movie critic, but you write your reviews like social media comments. Avoid describing physical movements or stage directions. Keep it written like a post someone would leave under a video or article: short paragraphs, heavy with emotion, weary tone, but no '(sighs)' or stage actions."},
        {"role": "user", "content": request.prompt}
    ]
}


    logger.debug(f"Sending request to {url} with payload: {payload}")

    try:
        async with httpx.AsyncClient() as client:
            async with client.stream("POST", url, json=payload) as response:
                if response.status_code != 200:
                    logger.error(f"Error from Ollama API: {response.text}")
                    raise HTTPException(status_code=response.status_code, detail="Error from Ollama API")

                final_response = ""
                async for line in response.aiter_lines():
                    if line.strip():
                        try:
                            json_data = json.loads(line)  # Parse each line as JSON
                            logger.debug(f"Received line: {json_data}")
                            # Extract the assistant's message ping content
                            if "message" in json_data and "content" in json_data["message"]:
                                final_response += json_data["message"]["content"]
                        except json.JSONDecodeError:
                            logger.error(f"Failed to parse line: {line}")
                            continue

        if not final_response:
            logger.error("Final response is empty after processing all lines.")
            raise HTTPException(status_code=500, detail="Empty response from Ollama API")

        logger.debug(f"Final concatenated response: {final_response}")
        return ChatResponse(response=final_response.strip())

    except httpx.RequestError as req_error:
        logger.error(f"Request error: {req_error}")
        raise HTTPException(status_code=500, detail="Failed to connect to Ollama API")
    except Exception as e:
        logger.exception(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    logger.info("Starting FastAPI server...")
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)