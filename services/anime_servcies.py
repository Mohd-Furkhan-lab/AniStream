from models.anime_model import get_anime,get_anime_ep,add_anime,update_details,add_ep,anime_list,delete_anime_fromdb,delete_ep,get_anime_by_name_or_id,is_ep_exists,add_anime_togenre
from fastapi import HTTPException
from schemas.anime_schemas import addgenre
#User Services

def get_anime_for_user(genre = None,name = None):
    try : 
        anime = get_anime(genre,name)
        if anime:
            return {'message' : anime}
    except Exception:
        raise HTTPException(404,detail="anime not found")
    
def get_animeep(name,epno=None):
    is_exist = get_anime_by_name_or_id(name)
    if is_exist:
        try :
            episode = get_anime_ep(name,epno)
            return {'message' : episode}
        except Exception:
            raise HTTPException(404,detail="Ep Not Found")
    else:
        raise HTTPException(404,detail="Anime Not Found")
    

#Admin Service


def get_animelist(isadmin):
    if isadmin:
        res = anime_list()
        return {'message' : res}



def addanime(data,isadmin):
    if isadmin:
        title = data.title.strip() if data.title else data.title
        image_url = data.image_url
        description = data.description
        status = data.status
        total_ep = data.total_ep
        release_year = data.release_year
        is_exists = get_anime_by_name_or_id(name=title)
        if is_exists :
            raise HTTPException(409,detail="Anime Already Exists")
        else:
            try:
                res = add_anime(title,description,status,total_ep,release_year,image_url)
                return {'message' : 'Anime Added Successfully'}
            except Exception  :
                raise HTTPException(500,detail="An Error Occured While Add ")


def addanimeep(data,isadmin):
    if isadmin:
        id = data.animeid
        epno = data.epno
        arc = data.arc
        ep_url = data.ep_url
        is_exists = is_ep_exists(id,epno)
        if is_exists :
            raise HTTPException(409,detail="Episode Already Exists")
        else:
            res = add_ep(id,epno,arc,ep_url)
            return {'message' : 'ep added successfully'}


def addanime_togenre(data:addgenre,is_admin):
    if is_admin:
        id = data.animeid
        genre = data.genre
        is_exists=get_anime_by_name_or_id(id=id)
        if is_exists is None:
            raise HTTPException(404,detail="Anime Not Found")
        else:
            add_anime_togenre(id,genre)
            return {"message" : "Anime added to genre successfully"}



def updateanime(data,isadmin,animeid):
    if isadmin:
        status = data.status
        description = data.description
        image_url = data.image_url
        is_exists = get_anime_by_name_or_id(id=animeid)
        if is_exists is None:
            raise HTTPException(404,detail="Anime Not Found ")
        else:
            try : 
                res = update_details(animeid,status,image_url,description)
                return {'message' : 'details updated successfully'}
            except Exception:
                raise HTTPException(500,detail="An Error Occured While Updating Info")
        

def deleteanime(isadmin,animeid):
    if isadmin:
        is_exists = get_anime_by_name_or_id(id=animeid)
        if is_exists is None:
            raise HTTPException(404,detail="Anime Not Found ")
        else:
            res = delete_anime_fromdb(animeid)
            return {'message' : 'anime deleted Successfully'}
        
def deleteep(is_admin,animeid,epno):
    if is_admin:
        is_exists = is_ep_exists(animeid,epno)
        if is_exists is None :
            raise HTTPException(409,detail="Episode Doesnt Exists")
        else:
            res=delete_ep(animeid,epno)
            return {'message': 'ep deleted successfully'}


