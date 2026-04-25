from repo.db import SessionLocal,Base
from sqlalchemy import Column,Integer,String,ForeignKey,func


#Anime Info Table
class Anime(Base):
    __tablename__="anime"
    id=Column(Integer,primary_key=True,nullable=False,autoincrement=True)
    title=Column(String,nullable=False)
    image_url = Column(String)
    description=Column(String,nullable=False)
    total_episodes=Column(Integer,nullable=False)
    status=Column(String,nullable=False)
    release_year=Column(String,nullable=False)

#Anime Episodes Table
class Episodes(Base):
    __tablename__="episodes"
    id = Column(Integer,primary_key=True,autoincrement=True)
    anime_id=Column(Integer,ForeignKey(Anime.id),nullable=False)
    epno=Column(Integer,nullable=False)
    arc=Column(String,nullable=False)
    ep_url=Column(String,nullable=False)


#Genre Table
class Genre(Base):
    __tablename__ = "genre"
    id = Column(Integer,primary_key=True,autoincrement=True)
    anime_id = Column(ForeignKey(Anime.id))
    genre = Column(String,nullable=False)


#Admin Operations

#Total Episodes

def total_episodes(id):
    with SessionLocal() as db:
        count = db.query(func.count(Episodes.epno)).filter(Anime.id == id).scalar()
        db.query(Anime).filter(Anime.id == id).update({"total_episodes":count})
        db.commit()


#Anime List For Admin
def anime_list():
    with SessionLocal() as db:
        animes = db.query(Anime).all()
        return animes


#Add Anime
def add_anime(title,description,status,total_ep,release_year,image_url):
    with SessionLocal() as db:
        anime = Anime(
            title = title,
            image_url = image_url,
            description = description,
            status = status,
            total_episodes =total_ep,
            release_year = release_year
        )
        db.add(anime)
        db.commit()

def add_ep(animeid,epno,arc,ep_url):
    with SessionLocal() as db:
        ep = Episodes(
            anime_id = animeid,
            epno = epno,
            arc = arc,
            ep_url = ep_url
        )
        db.add(ep)
        db.commit()
        total_episodes(animeid)

def update_details(animeid,status):
    with SessionLocal() as db:
        anime = db.query(Anime).filter(Anime.id == animeid).first()
        anime.status = status
        db.commit()
    
def delete_anime(animeid):
    with SessionLocal() as db:
        anime = db.query(Anime).filter(Anime.id == animeid).first()
        episodes = db.query(Episodes).filter(Episodes.anime_id == animeid).all()
        db.delete(anime)
        db.delete(episodes)
        db.commit()

#Users Fucntions

def get_anime(genre,name):
    with SessionLocal() as db:
        if name is not None and genre is None:
            anime = db.query(Anime).filter(Anime.title == name).first()
            return anime
        if name is None and genre is not None:
            animes = db.query(Anime).join(Genre).filter(Genre.genre == genre).all()
            return animes
        animes = db.query(Anime).all()
        return animes

def get_anime_ep(name,epno):
    with SessionLocal() as db:
        animeid = db.query(Anime.id).filter(Anime.title == name)
        if epno:
            episode = db.query(Episodes).filter(Episodes.anime_id == animeid,Episodes.epno == epno).first()
            return episode    
        episodes = db.query(Episodes).filter(Episodes.anime_id == animeid).all()
        return episodes