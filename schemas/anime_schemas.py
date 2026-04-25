from pydantic import BaseModel


class addanime_schemas(BaseModel):
    title : str
    image_url : str
    description : str
    status : str
    total_ep : int
    release_year : str

class addep(BaseModel):
    animeid : int
    epno : int
    arc : str
    ep_url : str

class update_anime(BaseModel):
    status : str