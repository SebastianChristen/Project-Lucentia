from fastapi import FastAPI, Request, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from endpoints.chats import router as chats_router
from endpoints.users import router as users_router
from endpoints.auth import router as auth_router

app = FastAPI()

API_KEY = "your-secret-key"
API_KEY_NAME = "X-API-KEY"

def api_key_auth(request: Request): # TODO: auskommentiert cuz lol
    # api_key = request.headers.get(API_KEY_NAME)
    # if api_key != API_KEY:
    #     raise HTTPException(status_code=403, detail="Unauthorized")
    pass

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8081","http://chat.neon-archive.xyz"],  # Nur Anfragen von localhost:8080 erlauben
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(chats_router, prefix="/chats", tags=["chats"], dependencies=[Depends(api_key_auth)])
app.include_router(users_router, prefix="/users", tags=["users"], dependencies=[Depends(api_key_auth)])
app.include_router(auth_router,  prefix="/auth",  tags=["Auth"],  dependencies=[Depends(api_key_auth)])
