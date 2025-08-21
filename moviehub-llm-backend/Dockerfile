# Folosește Python 3.10 slim
FROM python:3.10-slim

# Setează directorul de lucru
WORKDIR /app

# Copiază fișierul cu dependințe și instalează
COPY requirements.txt .
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

# Copiază codul aplicației
COPY . .

# Setează variabila de mediu pentru URL Ollama
ENV OLLAMA_URL=http://host.docker.internal:11434/api/chat

# Expune portul
EXPOSE 8000

# Rulează aplicația FastAPI
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
