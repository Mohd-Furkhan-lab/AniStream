from database.users_model import add_user,is_auser,get_userid
from auth.jwt_token import create_token
import bcrypt

def adduser(data):
    if data:
        name=data['name']
        password=data['password']
        email=data['email']
        hash_password=bcrypt.hashpw(password.encode("utf-8"),bcrypt.gensalt())
        res=add_user(name,email,hash_password)
        return res
        

def verifyuser(data,role:str):
    if data:
        email=data['email']
        password=data['password']
        saved_password = is_auser(email,password)
        is_authorize=bcrypt.checkpw(password.encode('utf-8'),saved_password)
        if is_authorize:
            userid=get_userid(is_authorize,email)
            token=create_token(userid,role)
            return token


