from fastapi import APIRouter
from typing import Optional

anime=APIRouter(prefix="/anime",tags=["anime"])

#user Needs to login first and everytime a token needs to be send 
@anime.get('/')
def all_anime(genre:Optional[str]=None):
    if genre :
        return {"Message":f"{genre}Anime"}
    return {"Message":"All Anime"}



#user Needs to login first and everytime a token needs to be send 
@anime.get('/{name}')
def get_animebyname(name:str):
    return {"Message":f"{name} Anime"}


#user Needs to login first and everytime a token needs to be send 
@anime.get('/{name}/episodes')
def get_animename_allep(name:str):
    return {"Message":f"{name} Anime all episodes"}


#user Needs to login first and everytime a token needs to be send 
@anime.get('/{name}/episodes/{epno}')
def get_byname_byepno(name:str,epno:int):
    return {"Message":f"{name} episodes no {epno}"}


