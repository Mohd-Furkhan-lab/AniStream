from models.anime_model import get_anime,get_anime_ep,add_anime,update_details,add_ep,anime_list,delete_anime



#User Services

def get_anime_for_user(genre = None,name = None):
    try : 
        anime = get_anime(genre,name)
        return {'message' : anime}
    except Exception as e:
        return {'error' : f'an error occured {e}'}
    
def get_animeep(name,epno):
    try :
        episode = get_anime_ep(name,epno)
        return {'message' : episode}
    except Exception as e:
        return {'error' : f'an error occured {e}'}
    

#Admin Service


def get_animelist(isadmin):
    if isadmin():
        res = anime_list()
        return {'message' : res}



def addanime(data,isadmin):
    if isadmin:
        title = data.title
        image_url = data.image_url
        description = data.description
        status = data.status
        total_ep = data.total_ep
        release_year = data.release_year
        try:
            res = add_anime(title,description,status,total_ep,release_year,image_url)
            return {'message' : 'Anime Added Successfully'}
        except Exception as e :
            return {'error' : f'an error occured {e}'}


def addanimeep(data,isadmin):
    if isadmin:
        id = data.animeid
        epno = data.epno
        arc = data.arc
        ep_url = data.ep_url
        try:
            res = add_ep(id,epno,arc,ep_url)
            return {'message' : 'ep added successfully'}
        except Exception as e:
            return {'error' : f'an error occured {e}'}

def updateanime(data,isadmin,animeid):
    if isadmin:
        status = data.status
        try : 
            res = update_details(animeid,status)
            return {'message' : 'details updated successfully'}
        except Exception as e:
            return {'error' : f'an error occured {e}'}
        

def deleteanime(isadmin,animeid):
    if isadmin:
        try :
            res = delete_anime(animeid)
        except Exception as e:
            return {'error' : f'an error occred {e}'}
        
