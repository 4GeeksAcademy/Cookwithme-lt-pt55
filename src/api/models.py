from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, ForeignKey,Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List


db = SQLAlchemy()

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(120), nullable=False)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    email: Mapped[str] = mapped_column(String(120), nullable=False)

    

    questions: Mapped[List["Question"]] = relationship(back_populates="user")
    utensil_users: Mapped[List["Utensil_user"]]  = relationship(back_populates="user")    
    calification : Mapped[List["Calification"]] = relationship(back_populates="user")  
    def __repr__(self):
        return '<User ' + self.email + ' >'

    def serialize(self):
        return {
            "id": self.id,
            "username" : self.username,
            "name": self.name,
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
    answers: Mapped[List["Answer"]] = relationship(back_populates="chef")



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
    utensil_users: Mapped[List["Utensil_user"]] = relationship(back_populates="utensil")

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
    name: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    description: Mapped[str] = mapped_column(nullable=False)
    image: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)

    recipe_ingredients: Mapped[List["Recipe_ingredient"]] = relationship(back_populates="ingredient")

    def __repr__(self):
        return f'<Ingredient {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "image": self.image
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

    recipe_id: Mapped[int] = mapped_column(ForeignKey("recipe.id"), nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)

    recipe: Mapped["Recipe"] = relationship(back_populates="questions")
    user: Mapped["User"] = relationship(back_populates="questions")

    answers: Mapped[List["Answer"]] = relationship(back_populates="question")

    def serialize(self):
        return {
            "id": self.id,
            "text": self.text,
            "recipe_id": self.recipe_id,
            "user_id": self.user_id
            # do not serialize the password, its a security breach
        }

class Recipe(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    description: Mapped[str] = mapped_column(String(120), nullable=False)
    img: Mapped[str] = mapped_column(String(120), nullable=False)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    preparation: Mapped[str] = mapped_column(String(120), nullable=False)

    calification: Mapped[List["Calification"]] = relationship(back_populates="recipe")
    #fav_recipe: Mapped[List["Fav_recipe"]] = relationship(back_populates="recipe")

    chef_id: Mapped[int] = mapped_column(ForeignKey("chef.id"))
    chef: Mapped["Chef"] = relationship(back_populates="recipe")

    utensil_recipes: Mapped[List["Utensil_recipe"]] = relationship(back_populates="recipe")
    recipe_ingredients: Mapped[List["Recipe_ingredient"]] = relationship(back_populates="recipe")
    questions: Mapped[List["Question"]] = relationship(back_populates="recipe")

    def __repr__(self):
        return f'<Recipe {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "description": self.description,
            "name": self.name,
            "img": self.img,
            "preparation": self.preparation
        }



class Answer(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    text: Mapped[str] = mapped_column(nullable=False)

    question_id: Mapped[int] = mapped_column(ForeignKey("question.id"), nullable=False)
    chef_id: Mapped[int] = mapped_column(ForeignKey("chef.id"), nullable=False)

    question: Mapped["Question"] = relationship(back_populates="answers")
    chef: Mapped["Chef"] = relationship(back_populates="answers")

    def serialize(self):
        return {
            "id": self.id,
            "text": self.text,
            "question_id": self.question_id,
            "chef_id": self.chef_id
            # do not serialize the password, its a security breach
        }
   
# class Fav_recipe(db.Model):
#     id: Mapped[int] = mapped_column(primary_key=True)

#     user_id: Mapped[int] = mapped_column(Integer,ForeignKey("user.id"), nullable=False)
#     user: Mapped["User"] = relationship(back_populates="fav_recipe")

#     recipe_id: Mapped[int] = mapped_column(Integer,ForeignKey("recipe.id"), nullable=False)
#     recipe: Mapped["Recipe"] = relationship(back_populates="fav_recipe")

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


class Recipe_ingredient(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    recipe_id: Mapped[int] = mapped_column(ForeignKey("recipe.id"), nullable=False)
    ingredient_id: Mapped[int] = mapped_column(ForeignKey("ingredient.id"), nullable=False)

    recipe: Mapped["Recipe"] = relationship("Recipe", back_populates="recipe_ingredients")
    ingredient: Mapped["Ingredient"] = relationship("Ingredient", back_populates="recipe_ingredients")

    def __repr__(self):
        return f'<RecipeIngredient recipe_id={self.recipe_id} ingredient_id={self.ingredient_id}>'

    def serialize(self):
        return {
            "id": self.id,
            "recipe_id": self.recipe_id,
            "ingredient_id": self.ingredient_id
        }

class Utensil_user(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)
    utensil_id: Mapped[int] = mapped_column(ForeignKey("utensil.id"), nullable=False)

    user: Mapped["User"] = relationship("User", back_populates="utensil_users")
    utensil: Mapped["Utensil"] = relationship("Utensil", back_populates="utensil_users")

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "user_email": self.user.email,
            "utensil_id": self.utensil_id,
            "utensil_name": self.utensil.name
        }