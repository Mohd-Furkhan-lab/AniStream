from database.db import SessionLocal,Base
from sqlalchemy import Column,Integer,String

class Anime(Base):
    __tablename__="Anime"
    id=Column(Integer,primary_key=True,nullable=False,autoincrement=True)
    anime_name=Column(String,nullable=False)
    genre=Column(String,nullable=False)
    description=Column(String,nullable=False)
    status=Column(String,nullable=False)
    total_episodes=Column(Integer,nullable=False)
    thumbnail=Column(String,nullable=False)



def get_anime_byid(id):
    with SessionLocal() as db:
        return db.query(Anime).filter(Anime.id == id).first()
         
            

def get_anime_bygenre(genre):
    if genre:
        with SessionLocal() as db:
            data=db.query(Anime).filter(Anime.genre == genre).all()
            return data

def add_anime(name,genre,description,status,total_episodes,thumbnail,role):
    if role == "Admin":
        with SessionLocal() as db:
            new_anime=Anime(
                anime_name=name,
                genre=genre,
                description=description,
                status=status,
                total_episodes=total_episodes,
                thumbnail=thumbnail
            )
            db.add(new_anime)
            db.commit()
    
def allanime():
    with SessionLocal() as db:
        data=db.query(Anime).all()
        return data

def delete_anime(id,role):
    if role == "Admin":
        with SessionLocal() as db:
            anime=db.query(Anime).filter(Anime.id == id).first()
            if anime:
                db.delete(anime)
                db.commit()
