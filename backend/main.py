from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.endpoints.chats import router as chats_router
from endpoints.users import router as users_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # Nur Anfragen von localhost:8080 erlauben
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(chats_router, prefix="/chats", tags=["chats"])
app.include_router(users_router, prefix="/users", tags=["users"])

