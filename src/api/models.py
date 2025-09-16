from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, ForeignKey,Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List


db = SQLAlchemy()

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)

    calification: Mapped[List["Calification"]] = relationship(back_populates="user")
    fav_recipe: Mapped[List["Fav_recipe"]] = relationship(back_populates="user")

    def __repr__(self):
        return '<User ' + self.email + ' >'

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
    name: Mapped[str] =  mapped_column(String(120), nullable=False)
    rating: Mapped[int] = mapped_column(nullable=False)

    recipe: Mapped[List["Recipe"]] = relationship(back_populates="chef")



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

    utensil_recipes: Mapped[List["Utensil_recipe"]] = relationship(back_populates="utensil")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
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
            "password": self.password
            # do not serialize the password, its a security breach
        }
    

class Question(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    text: Mapped[str] = mapped_column(nullable=False)


    def serialize(self):
        return {
            "id": self.id,
            "text": self.text
            # do not serialize the password, its a security breach
        }

class Recipe(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    description: Mapped[str] = mapped_column(String(120), unique=False, nullable=False)
    img: Mapped[str] = mapped_column(String(120), unique=False, nullable=False)
    name: Mapped[str] =  mapped_column(String(120), unique=False, nullable=False)
    preparation: Mapped[str] = mapped_column(String(120), nullable=False)

    calification: Mapped[List["Calification"]] = relationship(back_populates="recipe")
    fav_recipe: Mapped[List["Fav_recipe"]] = relationship(back_populates="recipe")

    chef_id: Mapped[int] = mapped_column(ForeignKey("chef.id"))
    chef: Mapped["Chef"] = relationship(back_populates="recipe")

    utensil_recipes: Mapped[List["Utensil_recipe"]] = relationship(back_populates="recipe")

    def __repr__(self):
        return 'Recipe: ' + self.name 
     
    def serialize(self):
        return {
            "id": self.id,
            "description": self.description,
            "name": self.name,
            "img": self.img,
            "preparation": self.preparation,
            "chef_id": self.chef_id
        }      
    
class Answer(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    text: Mapped[str] = mapped_column(nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "text": self.text
            # do not serialize the password, its a security breach
        }
   
class Fav_recipe(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)

    user_id: Mapped[int] = mapped_column(Integer,ForeignKey("user.id"), nullable=False)
    user: Mapped["User"] = relationship(back_populates="fav_recipe")

    recipe_id: Mapped[int] = mapped_column(Integer,ForeignKey("recipe.id"), nullable=False)
    recipe: Mapped["Recipe"] = relationship(back_populates="fav_recipe")

class Calification(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    stars: Mapped[str] = mapped_column(String(120), nullable=False)
    
    user_id: Mapped[int] = mapped_column(Integer,ForeignKey("user.id"), nullable=False)
    user: Mapped["User"] = relationship(back_populates="calification")

    recipe_id: Mapped[int] = mapped_column(Integer,ForeignKey("recipe.id"), nullable=False)
    recipe: Mapped["Recipe"] = relationship(back_populates="calification")


    def serialize(self):
         return {
            "id": self.id,
            "stars": self.stars,
            "user": self.user.serialize() if self.user else None,
            "user_id": self.user_id,
            "recipe_id": self.recipe_id,
            "recipe": self.recipe.serialize() if self.recipe else None
         }
 
class Utensil_recipe(db.Model):
    
    id: Mapped[int] = mapped_column(primary_key=True)
    recipe_id: Mapped[int] = mapped_column(ForeignKey("recipe.id"), nullable=False)
    utensil_id: Mapped[int] = mapped_column(ForeignKey("utensil.id"), nullable=False)

    recipe: Mapped["Recipe"] = relationship("Recipe", back_populates="utensil_recipes")
    utensil: Mapped["Utensil"] = relationship("Utensil", back_populates="utensil_recipes")

    def serialize(self):
        return {
            "id": self.id,
            "recipe_id": self.recipe_id,
            "recipe_name":self.recipe.name,
            "utensil_id": self.utensil_id,
            "utensil_name":self.utensil.name
        }


