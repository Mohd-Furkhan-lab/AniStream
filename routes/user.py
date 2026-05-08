from fastapi import APIRouter,Depends
from schemas.user_schemas import Login_schema,Signup_schema,addcollection,addwatchisory
from services.users_admin_services import login,signup,addtocollection,saveanimes,addtowatchistory,fetch_user
from dependecies.user_dependencies import get_user_id

users=APIRouter(prefix="/user",tags=["users"])

@users.post('/login')
def user_login(data:Login_schema):
    return login(data)

@users.post('/signup')
def user_signup(data:Signup_schema):
    return signup(data)
    
#user id needs to be in auth header to get all save anime
@users.post('/saveanime/{id:int}')
def saveanime(data:addcollection,id=Depends(get_user_id)):
    return addtocollection(user_id=id,anime_id=id)

#user id needs to be in auth header to get all save anime
@users.get('/savedanime')
def saved_animes(user_id=Depends(get_user_id)):
    return saveanimes(userid=user_id)



#user id needs to be in auth header to add watchistory
@users.post('/watchistory')
def watchistory(data:addwatchisory,user_id = Depends(get_user_id)):
    return addtowatchistory(userid=user_id,data=data)



