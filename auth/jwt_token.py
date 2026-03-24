import jwt
from datetime import datetime,timedelta
from dotenv import load_dotenv
import os 

load_dotenv()

def create_token(user_id,role):
    payload = {
        "user_id" : user_id,
        "role" : role,
        "exp" : datetime.utcnow()+timedelta(hours=5)
    }
    SECRET=os.getenv("SECRET_KEY")
    algorithm=os.getenv("algorithm")
    token=jwt.encode(payload,SECRET,algorithm)

    return token


