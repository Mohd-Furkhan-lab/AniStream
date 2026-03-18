from database.db import SessionLocal,Base
from sqlalchemy import Column,Integer,String,ForeignKey


#Anime Info Table
class Anime(Base):
    __tablename__="Anime"
    id=Column(Integer,primary_key=True,nullable=False,autoincrement=True)
    title=Column(String,nullable=False)
    description=Column(String,nullable=False)
    total_episodes=Column(Integer,nullable=False)
    status=Column(String,nullable=False)
    release_year=Column(String,nullable=False)

#Anime Episodes Table
class Episodes(Base):
    __tablename__="Episodes"
    anime_id=Column(Integer,ForeignKey(Anime.id),nullable=False)
    epid=Column(Integer)
    arc=Column(String,nullable=False)
    ep_url=Column(String,nullable=False)

