from fastapi import APIRouter,Depends
from typing import Optional
from services.anime_servcies import get_anime_for_user,get_animeep
from dependecies.user_dependencies import is_logged_in
anime=APIRouter(prefix="/anime",tags=["anime"])

#user Needs to login first and everytime a token needs to be send 
@anime.get('/')
def all_anime(genre:Optional[str]=None,is_loggedin = Depends(is_logged_in)):
    if is_loggedin:
        if genre :
            return get_anime_for_user(genre)
        return get_anime_for_user()



#user Needs to login first and everytime a token needs to be send 
@anime.get('/{name}')
def get_animebyname(name:str,is_loggedin = Depends(is_logged_in)):
    if is_loggedin:
        return get_anime_for_user(name=name)


#user Needs to login first and everytime a token needs to be send 
@anime.get('/{name}/episodes')
def get_animename_allep(name:str,is_loggedin = Depends(is_logged_in)):
    return get_animeep(name)


#user Needs to login first and everytime a token needs to be send 
@anime.get('/{name}/episodes/{epno}')
def get_byname_byepno(name:str,epno:int,is_loggedin = Depends(is_logged_in)):
    if is_loggedin:
        return get_animeep(name,epno)


