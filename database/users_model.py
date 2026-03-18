from sqlalchemy import Column,String,Integer,DateTime
from database.db import Base,SessionLocal


#User Info Table
class User(Base):
    __tablename__= "users"
    userid=Column(Integer,primary_key=True,autoincrement=True)
    name=Column(String,nullable=False)
    email=Column(String,nullable=False,unique=True)
    password=Column(String,nullable=False)
    role=Column(String,nullable=False)


#User Saved Anime Table
class Savedanime(Base):
    __tablename__="savedanime"
    userid=Column(Integer,nullable=False)
    animeid=Column(Integer,nullable=False)


#User Watchhistory Table
class Watchistory(Base):
    __tablename__="watchistory"
    userid=Column(Integer,nullable=False)
    animeid=Column(Integer,nullable=False)
    epid=Column(Integer,nullable=False)
    datetime=Column(DateTime,nullable=False)