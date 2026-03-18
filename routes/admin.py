from fastapi import APIRouter

admin=APIRouter(prefix="/admin",tags=["admin"])

@admin.post('/login')
def admin_login():
    return {"Message":"Admin Login"}

@admin.post('/anime')
def add_anime():
    return {"Message":"Add Anime"}

@admin.post('/anime/{animeid}/{ep}')
def add_anime_ep(animeid:int,ep:int):
    return {"Message":f"Added ep no {ep} to {animeid}"}

@admin.put('/anime/{animeid}')
def update_anime_info(animeid:int):
    return {"Message":f"Updated Details of anime {animeid}"}

@admin.delete('/anime/{id}')
def delete_anime(id:int):
    return {"Message":f"{id} Anime Deleted"}