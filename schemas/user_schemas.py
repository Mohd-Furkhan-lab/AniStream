from pydantic import BaseModel


class Signup_schema(BaseModel):
    name : str
    password : str
    email : str


class Login_schema(BaseModel):
    name : str
    password : str
    email : str



class addwatchisory(BaseModel):
    anime_id : int
    ep_id : int