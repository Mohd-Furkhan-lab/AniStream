from fastapi import APIRouter
from typing import Optional

anime=APIRouter(prefix="/anime",tags=["anime"])

@anime.get('/')
def all_anime(genre:Optional[str]=None):
    if genre:
        return {"Message":f"Anime By {genre}"}
    return {"Message":"All Anime"}


@anime.get('/stream/{id}')
def stream_anime(id):
    return {"Message":f"{id} Anime Playing........."}

@anime.get('/{id}')
def get_anime_byid(id):
    return {"Message":f"Admin No {id}"}