from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from endpoints.messages import router as messages_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # Nur Anfragen von localhost:8080 erlauben
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(messages_router, prefix="/messages", tags=["messages"])
