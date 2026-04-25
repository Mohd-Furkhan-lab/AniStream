from fastapi import APIRouter,Depends,UploadFile,File
from services.anime_servcies import addanime,addanimeep,updateanime,deleteanime,get_animelist
from dependecies.user_dependencies import is_admin
from schemas.anime_schemas import addanime_schemas,addep,update_anime
from cloudinary import uploader

admin=APIRouter(prefix="/admin",tags=["admin"])


@admin.post('/upload')
async def upload_img(file : UploadFile = File(...)):
    result = uploader.upload(file.file,resource_type="auto")
    return {'url' : result['secure_url']}

@admin.post('/anime')
def add_anime(data:addanime_schemas,is_admin=Depends(is_admin)):
    return addanime(data,is_admin)

@admin.post('/anime/episode')
def add_anime_ep(data:addep,is_admin=Depends(is_admin)):
    return addanimeep(data,is_admin)

@admin.put('/anime/{animeid}')
def update_anime_info(animeid:int,data:update_anime,is_admin = Depends(is_admin)):
    return updateanime(data,is_admin,animeid)

@admin.delete('/anime/{id}')
def delete_anime(id:int,is_admin = Depends(is_admin)):
    return deleteanime(is_admin,id)

@admin.get('/anime')
def getallanimes(is_admin = Depends(is_admin)):
    return get_animelist(is_admin)