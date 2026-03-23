from fastapi import APIRouter
from schemas.user_schemas import Login_schema,Signup_schema

users=APIRouter(prefix="/user",tags=["users"])

@users.post('/login')
def login(data:Login_schema):
    return {"Message":"User Login"}

@users.post('/signup')
def signup(data:Signup_schema):
    return {"Message":"User Signup"}

@users.post('/saveanime/{id:int}')
def saveanime(id):
    return {"Message":f"Anime {id} Saved Signup"}

#user id needs to be in auth header to get all save anime
@users.get('/savedanime')
def savedanimes():
    return {"Message":f"Saved Anime"}

#user id needs to be in auth header to get watchistory
@users.get('/watchistory')
def watchistory():
    return {"Message":"Anime Watchistory"}