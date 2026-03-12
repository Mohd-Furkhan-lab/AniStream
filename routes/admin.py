from fastapi import APIRouter

admin=APIRouter(prefix="/admin",tags=["admin"])

@admin.post('/login')
def admin_login():
    return {"Message":"Admin Login"}

@admin.get('/anime')
def get_all_anime():
    return {"Message":"All Anime"}

@admin.get('/anime/{genre}')
def filter_anime_by_genre(genre:str):
    return {"Message":f"{genre} Anime"}

@admin.post('/anime')
def add_anime():
    return {"Message":"Add Anime"}

@admin.delete('/anime/{id}')
def delete_anime(id:int):
    return {"Message":f"{id} Anime Deleted"}