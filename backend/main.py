from fastapi import FastAPI, Request, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from endpoints.chats import router as chats_router
from endpoints.users import router as users_router

app = FastAPI()

API_KEY = "your-secret-key"
API_KEY_NAME = "X-API-KEY"

def api_key_auth(request: Request):
    api_key = request.headers.get(API_KEY_NAME)
    if api_key != API_KEY:
        raise HTTPException(status_code=403, detail="Unauthorized")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # Nur Anfragen von localhost:8080 erlauben
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(chats_router, prefix="/chats", tags=["chats"], dependencies=[Depends(api_key_auth)])
app.include_router(users_router, prefix="/users", tags=["users"], dependencies=[Depends(api_key_auth)])

