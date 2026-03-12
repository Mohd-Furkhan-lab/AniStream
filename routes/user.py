from fastapi import APIRouter

users=APIRouter(prefix="/user",tags=["users"])

@users.post('/login')
def login():
    return {"Message":"User Login"}

@users.post('/signup')
def signup():
    return {"Message":"User Signup"}

