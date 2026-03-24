from sqlalchemy import Column,String,Integer,DateTime
from database.db import Base,SessionLocal
import uuid

#User Info Table
class User(Base):
    __tablename__= "users"
    userid=Column(String,primary_key=True,default=lambda:str(uuid.uuid4()))
    name=Column(String,nullable=False)
    email=Column(String,nullable=False,unique=True)
    password=Column(String,nullable=False)
    role=Column(String,nullable=False)


#User Saved Anime Table
class Savedanime(Base):
    __tablename__="savedanime"
    id=Column(Integer,nullable=False)
    userid=Column(String,nullable=False)
    animeid=Column(Integer,nullable=False)


#User Watchhistory Table
class Watchistory(Base):
    __tablename__="watchistory"
    userid=Column(String,nullable=False)
    animeid=Column(Integer,nullable=False)
    epid=Column(Integer,nullable=False)
    datetime=Column(DateTime,nullable=False)


def add_user(name,email,password,role):
    with SessionLocal() as db:
        new_user=User(
            name = name,
            email= email,
            password = password,
            role=role
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user

def is_auser(mail,password):
    with SessionLocal() as db:
        is_user=db.query(User.name).filter(User.email == mail).first()
        if is_user:
            password=db.query(User.password).filter(User.name == is_user)
            return password

def get_userid(is_authorize:bool,gmail:str):
    with SessionLocal() as db:
        if is_authorize():
            user_id=db.query(User.userid).filter(User.email == gmail).first()
            return user_id