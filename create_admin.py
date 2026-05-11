from repo.db import SessionLocal, Base, engine
from dotenv import load_dotenv
import os
from models.users_model import User
import bcrypt

Base.metadata.create_all(bind=engine)

load_dotenv()


def create_admin():

    admin_name = os.getenv("admin_name")
    admin_email = os.getenv("admin_email")
    admin_password = os.getenv("admin_password")

    with SessionLocal() as db:

        # Check if admin already exists
        existing_admin = (
            db.query(User)
            .filter(User.email == admin_email)
            .first()
        )

        if existing_admin:
            print("Admin already exists")
            return

        hash_password = bcrypt.hashpw(
            admin_password.encode(),
            bcrypt.gensalt()
        ).decode()

        admin = User(
            name=admin_name,
            email=admin_email,
            password=hash_password,
            role="admin"
        )

        db.add(admin)
        db.commit()

        print("Admin Added Successfully")


create_admin()