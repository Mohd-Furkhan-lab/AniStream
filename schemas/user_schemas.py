from pydantic import BaseModel


class Signup_schema(BaseModel):
    name : str
    password : str
    email : str


class Login_schema(BaseModel):
    name : str
    password : str
    email : str

class addcollection(BaseModel):
    anime_id : int


class addwatchisory(BaseModel):
    anime_id : str
    ep_id : str