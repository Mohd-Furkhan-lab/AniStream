from fastapi import FastAPI
from routes.user import users
from routes.admin import admin
from routes.anime import anime

app=FastAPI()
app.include_router(users)
app.include_router(admin)
app.include_router(anime)

def get_app():
    return app