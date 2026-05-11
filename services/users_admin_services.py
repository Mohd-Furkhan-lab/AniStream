from fastapi import HTTPException
from models.users_model import add_user,is_user,get_token_payload_data,saved_animes,savea_anime,add_watchhistory,get_all_users,is_user_exist,watchistory_of_auser
from auth.Jwttoken import create_token
import bcrypt
import uuid


def login(data):
    name = data.name
    email = data.email
    password = data.password 
    stored_password = is_user(email,name)
    if not stored_password:
            raise HTTPException(401,detail="invalid crednetials")
    res=bcrypt.checkpw(password.encode(),stored_password)
    if not  res:
        raise HTTPException(401,detail="invalid crednetials")
    data = get_token_payload_data(res,email)
    if not data:
        raise HTTPException(401,detail="invalid crednetials")
    token = create_token(data[0],data[1])
    return {'message' : f'token : {token}'}



def signup(data):
    name = data.name
    email = data.email
    password = data.password
    is_exist = is_user_exist(email)
    if is_exist:
        raise HTTPException(409,detail="User Already Exists")
    else:
        hash_password = bcrypt.hashpw(password.encode(),bcrypt.gensalt())
        res = add_user(name,email,hash_password)
        return {'message' : 'user added successfully'}


def saveanimes(userid):
    try:
        data = saved_animes(userid)
        return {'message' : data } 
    except HTTPException:
        raise HTTPException(404,detail="no data found")
    
def addtocollection(user_id,anime_id):
    try:
        res = savea_anime(user_id,anime_id)
        return {'message' : 'anime added successfully'}
    except HTTPException:
        raise HTTPException(500,detail="an error occured while adding ")

def addtowatchistory(userid,data):
    anime_id = data.anime_id
    ep_id = data.ep_id
    try:
        res = add_watchhistory(userid,anime_id,ep_id)
    except HTTPException:
        raise HTTPException(500,detail= "an error occured cant updat watchistory")

def fetch_watchistory(userid):
    history = watchistory_of_auser(userid)
    return history    

#Admin Services
def fetch_user(role):
    if role == "admin":
        return get_all_users()
    raise HTTPException(401,detail="unauthorized access")


