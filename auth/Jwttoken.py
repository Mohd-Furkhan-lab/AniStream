import jwt
from dotenv import load_dotenv
import os
import datetime

load_dotenv()


def create_token(userid,role):
    secret_key = os.getenv("SECRET_KEY")
    payload = {
        "user_id" : userid,
        "role" : role,
        "exp" : datetime.datetime.now(datetime.UTC)+datetime.timedelta(hours=1)
    }
    token = jwt.encode(payload,key=secret_key,algorithm="HS256")
    return token


def verify_token(token):
    secretkey = os.getenv("SECRET_KEY")
    try:
        payload = jwt.decode(token,key=secretkey,algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        raise Exception("Token Has Expired")
    except jwt.InvalidTokenError:
        raise Exception("Invalid Token ")

