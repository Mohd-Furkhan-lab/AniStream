from pydantic import BaseModel
from typing import Optional

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
    status : Optional[str] = None
    description : Optional[str] = None
    image_url : Optional[str] = None


class addgenre(BaseModel):
    animeid : str
    genre : str

