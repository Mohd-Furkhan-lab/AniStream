from fastapi import FastAPI
from routes.user import users
from routes.admin import admin
from routes.anime import anime
from repo.db import Base,engine
from core import config
from fastapi.middleware.cors import CORSMiddleware



app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(users)
app.include_router(admin)
app.include_router(anime)
Base.metadata.create_all(engine)


def get_app():
    return app