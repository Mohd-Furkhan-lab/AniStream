from sqlalchemy import Column,String,Integer,DateTime,ForeignKey,func
from repo.db import Base,SessionLocal
import uuid

#User Info Table
class User(Base):
    __tablename__= "users"
    userid=Column(String,primary_key=True,default=lambda:str(uuid.uuid4()))
    name=Column(String,nullable=False)
    email=Column(String,nullable=False,unique=True)
    password=Column(String,nullable=False)
    role=Column(String,nullable=False,default="user")


#User Saved Anime Table
class SavedAnime(Base):
    __tablename__="SavedAnime"
    saveid=Column(Integer,nullable=False,primary_key=True,autoincrement=True)
    userid=Column(ForeignKey(User.userid))
    animeid=Column(Integer,nullable=False)


#User Watchhistory Table
class WatchHistory(Base):
    __tablename__="watch_history"
    watchid=Column(Integer,primary_key=True,autoincrement=True)
    userid=Column(ForeignKey(User.userid))
    animeid=Column(Integer,nullable=False)
    epid=Column(Integer,nullable=False)
    watched_at=Column(DateTime,default=func.now())

#Add User Details 
def add_user(name,email,password):
    with SessionLocal() as db:
        new_user=User(
            name = name,
            email= email,
            password = password
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user

#User Authenticator
def is_user(email,name):
    with SessionLocal() as db:
        user = db.query(User).filter(User.email == email,User.name == name).first()
        return user.password if user else None

def get_token_payload_data(is_auth,email):
    with SessionLocal() as db:
        user = db.query(User).filter(User.email == email).first()
        user_id = user.userid
        role=user.role
        return [user_id,role]

#To save new animes
def savea_anime(user_id,anime_id):
    with SessionLocal() as db:
        newanime = SavedAnime(
            userid = user_id,
            animeid = anime_id
        )
        db.add(newanime)
        db.commit()

#To Fetch saved animes
def saved_animes(user_id):
    with SessionLocal() as db:
        animes = db.query(SavedAnime).filter(SavedAnime.userid == user_id).all()
        return animes



#To add animes to watchhistory
def add_watchhistory(user_id,anime_id,epid):
    with SessionLocal() as db:
        anime = WatchHistory(
            userid = user_id,
            animeid = anime_id,
            epid = epid
        )
        db.add(anime)
        db.commit()


#For Admin Processes 
def get_all_users():
        with SessionLocal() as db:
            data = db.query(User).all()
            return data
