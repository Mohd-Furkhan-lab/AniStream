from schemas.user_schemas import Signup_schema,Login_schema
from service.user_services import add_user,verify_user

def user_signup(data:Signup_schema):
    if data:
        res=add_user(data)
        if res:
            return {"message":"user addedd successfully"}
        else:
            return {"message":"data missing"}


def user_login(data:Login_schema):
    if data:
        res=verify_user(data)
        if res:
            return {"message":"welcome user"}
        else:
            return {"message":"data missing"}