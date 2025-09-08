from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column

db = SQLAlchemy()

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)


    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Chef(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    name: Mapped[str] =  mapped_column(String(120), unique=True, nullable=False)
    rating: Mapped[int] = mapped_column(nullable=False)

    # recipe: Mapped[List["Recipe"]] = relationship(back_populates="chef")



    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "rating": self.rating
            # do not serialize the password, its a security breach
        }
    
    
class Utensil(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    description: Mapped[str] = mapped_column(nullable=False)
    url_img: Mapped[str] =  mapped_column(String(120), unique=True, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.name,
            "url_img": self.url_img
            # do not serialize the password, its a security breach
        }

class Ingredient(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] =  mapped_column(String(120), unique=True, nullable=False)
    description: Mapped[str] = mapped_column(nullable=False)
    image: Mapped[str] =  mapped_column(String(120), unique=True, nullable=False)


    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "image": self.image
            # do not serialize the password, its a security breach
        }

class Admin_user(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)


    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "password": self.password,
            # do not serialize the password, its a security breach
        }
    