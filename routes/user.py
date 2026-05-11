from fastapi import APIRouter,Depends
from schemas.user_schemas import Login_schema,Signup_schema,addwatchisory
from services.users_admin_services import login,signup,addtocollection,saveanimes,addtowatchistory,fetch_user,fetch_watchistory
from dependecies.user_dependencies import get_user_id

users=APIRouter(prefix="/user",tags=["users"])

@users.post('/login')
def user_login(data:Login_schema):
    return login(data)

@users.post('/signup')
def user_signup(data:Signup_schema):
    return signup(data)
    
#user id needs to be in auth header to get all save anime
@users.post('/saveanime/{animeid:int}')
def saveanime(animeid,id=Depends(get_user_id)):
    return addtocollection(user_id=id,anime_id=animeid)

#user id needs to be in auth header to get all save anime
@users.get('/savedanime')
def saved_animes(user_id=Depends(get_user_id)):
    return saveanimes(userid=user_id)



#user id needs to be in auth header to add watchistory
@users.post('/watchistory')
def watchistory(data:addwatchisory,user_id = Depends(get_user_id)):
    return addtowatchistory(userid=user_id,data=data)


@users.get('/watchistory')
def user_watchhistory(user_id = Depends(get_user_id)):
    return fetch_watchistory(user_id)
