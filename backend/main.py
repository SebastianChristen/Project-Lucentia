from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from endpoints.chats import router as chats_router
from endpoints.users import router as users_router
from endpoints.auth import router as auth_router
from endpoints.images import router as images_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8081","http://localhost:4200"],
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(chats_router, prefix="/chats", tags=["chats"], )
app.include_router(users_router, prefix="/users", tags=["users"], )
app.include_router(auth_router,  prefix="/auth",  tags=["Auth"],  )
app.include_router(images_router, prefix="/images", tags=["images"], )
