from database.db import SessionLocal,Base
from sqlalchemy import Column,Integer,String

class Anime(Base):
    __tablename__="Anime"
    id=Column(Integer,primary_key=True,nullable=False,autoincrement=True)
    anime_name=Column(String)
