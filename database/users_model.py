from sqlalchemy import Column,String,Integer
from database.db import Base,SessionLocal


class User(Base):
    __tablename__= "users"

    id=Column(Integer,primary_key=True,autoincrement=True)
    name=Column(String,nullable=False)
    email=Column(String,nullable=False,unique=True)
    password=Column(Integer,nullable=False)
    role=Column(String,nullable=False)

def add_user(name,email,password,role):
    with SessionLocal() as db:
        new_user=User(
            name = name,
            email = email,
            password = password,
            role = role
        )
        db.add(new_user)
        db.commit()
