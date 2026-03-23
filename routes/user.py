from fastapi import APIRouter,Request
from controllers.user_controller import user_signup,user_login

users=APIRouter(prefix="/user",tags=["users"])

@users.post('/login')
async def login(request:Request):
    data=await request.json()
    res=user_login(data)
    return res

@users.post('/signup')
async def signup(request:Request):
    data= await request.json()
    res=user_signup(data)
    return res
    

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