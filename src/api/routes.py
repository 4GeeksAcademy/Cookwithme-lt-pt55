"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Chef, Utensil,Ingredient,Admin_user,Question,Answer, Recipe
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello from BACK"
    }

    return jsonify(response_body), 200

@api.route('/users', methods=['GET'])
def get_all_users():
    all_users = User.query.all()
    results = list(map( lambda user: user.serialize(), all_users))
    return jsonify(results), 200


@api.route('/chefs', methods=['GET'])
def get_all_chef():
    all_chefs = Chef.query.all()
    results = list(map( lambda chef: chef.serialize(), all_chefs))
    return jsonify(results), 200

@api.route('/chefs/<int:chef_id>', methods=['GET'])
def get_chef(chef_id):
    chef = Chef.query.filter_by(id=chef_id).first()
    if chef is None:
        return {"error-msg":"enter a valid chef"},400
    return jsonify(chef.serialize()), 200

@api.route('/chefs/<int:chef_id>', methods=['DELETE'])
def delete_chef(chef_id):
    chef = Chef.query.filter_by(id=chef_id).first()
    if chef is None:
        return {"error-msg":"enter a valid chef"},400
    db.session.delete(chef)
    db.session.commit()
    response_body = {
        "message": "se elimino el chef " + chef.name
    }

    return jsonify(response_body), 200

@api.route('/chefs', methods=['POST'])
def add_chef():
    body = request.get_json()
    chef = Chef(name=body["name"],email=body["email"],rating=body["rating"], password=body["password"])
    db.session.add(chef)
    db.session.commit()
    response_body = {
        "se creo el chef ": chef.serialize()
    }

    return jsonify(response_body), 200

@api.route('/chefs/<int:chef_id>', methods=['PUT'])
def update_chef(chef_id):
    chef = Chef.query.filter_by(id=chef_id).first()
    if chef is None:
        return {"error-msg":"chef does not exist"},400
    
    body = request.get_json()
    chef = Chef(name=body["name"],email=body["email"],rating=body["rating"])
    db.session.commit()
    response_body = {
        "message": "chef " + chef.name + " successfully update"
    }

    return jsonify(response_body), 200

#-------------------  utensilios ----------------------------------------
@api.route('/utensils', methods=['GET'])
def get_all_utensil():
    all_utensils = Utensil.query.all()
    results = list(map( lambda utensil: utensil.serialize(), all_utensils))
    return jsonify(results), 200

@api.route('/utensils/<int:utensil_id>', methods=['GET'])
def get_utensil(utensil_id):
    utensil = Utensil.query.filter_by(id=utensil_id).first()
    if utensil is None:
        return {"error-msg":"enter a valid utensil"},400
    return jsonify(utensil.serialize()), 200

@api.route('/utensils/<int:utensil_id>', methods=['DELETE'])
def delete_utensil(utensil_id):
    utensil = Utensil.query.filter_by(id=utensil_id).first()
    if utensil is None:
        return {"error-msg":"enter a valid utensil"},400
    db.session.delete(utensil)
    db.session.commit()
    response_body = {
        "message": "se elimino el chef " + utensil.name
    }

    return jsonify(response_body), 200

@api.route('/utensils', methods=['POST'])
def add_utensil():
    body = request.get_json()
    utensil = Utensil(name=body["name"],description=body["description"],url_img=body["url_img"])
    db.session.add(utensil)
    db.session.commit()
    response_body = {
        "se creo el utensilio ": utensil.serialize()
    }

    return jsonify(response_body), 200



@api.route('/utensils/<int:utensil_id>', methods=['PUT'])
def update_utensil(utensil_id):
    utensil = Utensil.query.filter_by(id=utensil_id).first()
    if utensil is None:
        return jsonify({"error-msg": "utensil does not exist"}), 404
    
    body = request.get_json()
    utensil.name = body.get("name", utensil.name)
    utensil.description = body.get("description", utensil.description)
    utensil.url_img = body.get("image", utensil.url_img)
    db.session.commit()
    response_body = {
        "message": f"utensil {utensil.id} updated successfully",
        "utensil": utensil.serialize()
    }
    return jsonify(response_body), 200

    # #--------Ingrediente-----------------------

@api.route('/ingredients', methods=['GET'])
def get_all_ingredients():
    all_ingredients = Ingredient.query.all()
    results = list(map( lambda ingredient: ingredient.serialize(), all_ingredients))
    return jsonify(results), 200

@api.route('/ingredients/<int:ingredient_id>', methods=['GET'])
def get_ingredient(ingredient_id):
    ingredient = Ingredient.query.filter_by(id=ingredient_id).first()
    if ingredient is None:
        return {"error-msg":"enter a valid ingredient"},400
    return jsonify(ingredient.serialize()), 200

@api.route('/ingredients/<int:ingredient_id>', methods=['DELETE'])
def delete_ingredient(ingredient_id):
    ingredient = Ingredient.query.filter_by(id=ingredient_id).first()
    if ingredient is None:
        return {"error-msg":"enter a valid ingredient"},400
    db.session.delete(ingredient)
    db.session.commit()
    response_body = {
        "message": "se elimino el ingredient " + ingredient.name
    }

    return jsonify(response_body), 200

@api.route('/ingredients', methods=['POST'])
def add_ingredient():
    body = request.get_json()
    ingredient = Ingredient(name=body["name"],description=body["description"],image=body["image"])
    db.session.add(ingredient)
    db.session.commit()
    response_body = {
        "se creo el ingredient ": ingredient.serialize()
    }

    return jsonify(response_body), 200


@api.route('/ingredients/<int:ingredient_id>', methods=['PUT'])
def update_ingredient(ingredient_id):
    ingredient = Ingredient.query.filter_by(id=ingredient_id).first()
    if ingredient is None:
        return jsonify({"error-msg": "ingredient does not exist"}), 404
    
    body = request.get_json()
    ingredient.name = body.get("name", ingredient.name)
    ingredient.description = body.get("description", ingredient.description)
    ingredient.image = body.get("image", ingredient.image)
    db.session.commit()
    response_body = {
        "message": f"Ingredient {ingredient.id} updated successfully",
        "ingredient": ingredient.serialize()
    }


    return jsonify(response_body), 200

    # #--------Administrador-----------------------

@api.route('/adminuser', methods=['GET'])
def get_all_adminusers():
    all_admins = Admin_user.query.all()
    results = list(map( lambda adminuser: adminuser.serialize(), all_admins))
    return jsonify(results), 200


@api.route('/adminuser/<int:adminuser_id>', methods=['GET'])
def get_admin(adminuser_id):
    admin = Admin_user.query.filter_by(id=adminuser_id).first()
    if admin is None:
        return {"error-msg":"enter a valid admin"},400
    return jsonify(admin.serialize()), 200

@api.route('/adminuser/<int:adminuser_id>', methods=['DELETE'])
def delete_admin(adminuser_id):
    adminuser = Admin_user.query.filter_by(id=adminuser_id).first()
    if adminuser is None:
        return {"error-msg":"enter a valid Admin User"},400
    db.session.delete(adminuser)
    db.session.commit()
    admin_response_body = {
        "message": "se elimino el Admin " + adminuser.email}
    return jsonify(admin_response_body), 200

@api.route('/adminuser', methods=['POST'])
def add_admin():
    admin_body = request.get_json()
    admin = Admin_user(email=admin_body["email"],password=admin_body["password"])
    db.session.add(admin)
    db.session.commit()
    admin_response_body = {
        "Se registro un nuevo administrador": admin.serialize()
    }

    return jsonify(admin_response_body), 200

@api.route('/adminuser/<int:adminuser_id>', methods=['PUT'])
def update_admin(adminuser_id):
    admin = Admin_user.query.filter_by(id=adminuser_id).first()
    if admin is None:
        return jsonify({"error-msg": "admin does not exist"}), 404
    
    admin_body = request.get_json()
    admin.email = admin_body.get("email", admin.email)
    admin.password = admin_body.get("password", admin.password)
    db.session.commit()
    admin_response_body = {
        "message": f"Admin {admin.id} updated successfully",
        "utensil": admin.serialize()
    }

    return jsonify(admin_response_body), 200
  
  # #--------Recipes-----------------------

@api.route('/recipes', methods=['GET'])
def get_all_recipes():
    all_recipes = Recipe.query.all()
    results = list(map( lambda recipe: recipe.serialize(), all_recipes))
    return jsonify(results), 200

@api.route('/recipes/<int:recipe_id>', methods=['GET'])
def get_recipe(recipe_id):
    recipe = Recipe.query.filter_by(id=recipe_id).first()
    if recipe is None:
        return {"error-msg":"enter a valid recipe"},400
    return jsonify(recipe.serialize()), 200

@api.route('/recipes', methods=['POST'])
def add_recipe():
    body = request.get_json()
    recipe = Recipe(name=body["name"],description=body["description"],img=body["img"], preparation=body["preparation"], chef_id=body["chef_id"])
    db.session.add(recipe)
    db.session.commit()
    response_body = {
        "se creo el recipe ": recipe.serialize()
    }

    return jsonify(response_body), 200

@api.route('/recipes/<int:recipe_id>', methods=['DELETE'])
def delete_recipe(recipe_id):
    recipe = Recipe.query.filter_by(id=recipe_id).first()
    if recipe is None:
        return {"error-msg":"enter a valid recipe"},400
    db.session.delete(recipe)
    db.session.commit()
    response_body = {
        "message": "se elimino el recipe " + recipe.name
    }

    return jsonify(response_body), 200

@api.route('/recipes/<int:recipe_id>', methods=['PUT'])
def update_recipe(recipe_id):
    recipe = Recipe.query.filter_by(id=recipe_id).first()
    if recipe is None:
        return {"error-msg":"recipe does not exist"},400
    
    body = request.get_json()
    recipe = Recipe(name=body["name"],description=body["description"],preparation=body["preparation"],img=body["img"])
    db.session.commit()
    response_body = {
        "message": "recipe " + recipe.name + " successfully update"
    }

    return jsonify(response_body), 200

    # #--------Question-----------------------

@api.route('/questions', methods=['GET'])
def get_all_questions():
    all_questions = Question.query.all()
    results = list(map( lambda question: question.serialize(), all_questions))
    return jsonify(results), 200

@api.route('/questions/<int:question_id>', methods=['GET'])
def get_question(question_id):
    question = Question.query.filter_by(id=question_id).first()
    if question is None:
        return {"error-msg":"enter a valid question"},400
    return jsonify(question.serialize()), 200

@api.route('/questions/<int:question_id>', methods=['DELETE'])
def delete_question(question_id):
    question = Question.query.filter_by(id=question_id).first()
    if question is None:
        return {"error-msg":"enter a valid question"},400
    db.session.delete(question)
    db.session.commit()
    response_body = {
        "message": "se elimino el question " + question.text
    }

    return jsonify(response_body), 200

@api.route('/questions', methods=['POST'])
def add_question():
    body = request.get_json()
    question = Question(text=body["text"])
    db.session.add(question)
    db.session.commit()
    response_body = {
        "se creo el question ": question.serialize()
    }

    return jsonify(response_body), 200


@api.route('/questions/<int:question_id>', methods=['PUT'])
def update_question(question_id):
    question = Question.query.filter_by(id=question_id).first()
    if question is None:
        return jsonify({"error-msg": "question does not exist"}), 404
    
    # #--------Answer-----------------------

@api.route('/answers', methods=['GET'])
def get_all_answers():
    all_answers = Answer.query.all()
    results = list(map(lambda answer: answer.serialize(), all_answers))
    return jsonify(results), 200

@api.route('/answers/<int:answer_id>', methods=['GET'])
def get_answer(answer_id):
    answer = Answer.query.filter_by(id=answer_id).first()
    if answer is None:
        return {"error-msg": "enter a valid answer"}, 400
    return jsonify(answer.serialize()), 200

@api.route('/answers/<int:answer_id>', methods=['DELETE'])
def delete_answer(answer_id):
    answer = Answer.query.filter_by(id=answer_id).first()
    if answer is None:
        return {"error-msg": "enter a valid answer"}, 400
    db.session.delete(answer)
    db.session.commit()
    response_body = {
        "message": "se elimino el answer " + answer.text
    }

    return jsonify(response_body), 200

@api.route('/answers', methods=['POST'])
def add_answer():
    body = request.get_json()
    answer = Answer(text=body["text"])
    db.session.add(answer)
    db.session.commit()
    response_body = {
        "se creo el answer ": answer.serialize()
    }

    return jsonify(response_body), 200


@api.route('/answers/<int:answer_id>', methods=['PUT'])
def update_answer(answer_id):
    answer = Answer.query.filter_by(id=answer_id).first()
    if answer is None:
        return jsonify({"error-msg": "answer does not exist"}), 404
    
    body = request.get_json()
    answer.text = body.get("text", answer.text)
    db.session.commit()
    response_body = {
        "message": f"Answer {answer.id} updated successfully",
        "answer": answer.serialize()
    }

    return jsonify(response_body), 200

    #----Calification---------------------------------------------

# @api.route('/reviews', methods=['GET'])
# def get_all_reviews():
#     all_reviews = Calification.query.all()
#     results = list(map( lambda calification: calification.serialize(), all_reviews))
#     return jsonify(results), 200


# @api.route('/reviews/<int:review_id>', methods=['GET'])
# def get_review(review_id):
#     review = Calification.query.filter_by(id=review_id).first()
#     if review is None:
#         return {"error-msg":"enter a valid Calification"},400
#     return jsonify(review.serialize()), 200

# @api.route('/reviews/<int:review_id>', methods=['DELETE'])
# def delete_review(review_id):
#     review = Calification.query.filter_by(id=review_id).first()
#     if review is None:
#         return {"error-msg":"enter a valid Admin User"},400
#     db.session.delete(review)
#     db.session.commit()
#     stars_response_body = {
#         "message": "se elimino la calificacion "}
#     return jsonify(stars_response_body), 200

# @api.route('/reviews', methods=['POST'])
# def add_review():
#     review_body = request.get_json()
#     review = Calification(stars=review_body["stars"])
#     db.session.add(review)
#     db.session.commit()
#     admin_response_body = {
#         "Se registro una nueva reseña": review.serialize()
#     }

#     return jsonify(admin_response_body), 200

# @api.route('/reviews/<int:review_id>', methods=['PUT'])
# def update_review(review_id):
#     review = Calification.query.filter_by(id=review_id).first()
#     if review is None:
#         return jsonify({"error-msg": "review does not exist"}), 404
    
#     review_body = request.get_json()
#     review.stars = review_body.get("stars", review.stars)
#     db.session.commit()
#     admin_response_body = {
#         "message": f"Admin {review.id} updated successfully",
#         "Review": review.serialize()
#     }

#     return jsonify(admin_response_body), 200

## ------------------- Log in Chef -----------------------


@api.route('/test', methods=['POST', 'GET'])
def test():

    response_body = {
        "message": "Hello this is a test"
    }

    return jsonify(response_body), 200

@api.route("/login_chef", methods=["POST"])
def login_as_chef():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    chef = Chef.query.filter_by(email = email).first()
    if chef is None: 
        return jsonify({"msg": "Bad email or password"}), 401
    print(chef)
    if password != chef.password:
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

@api.route('/signup_chef', methods=['POST'])
def signup_as_chef():
    body = request.get_json()
    chef = Chef.query.filter_by(email=body["email"]).first()
    if chef:
        return jsonify({"msg": "Chef already exist"}), 401

    chef = Chef(name=body["name"],email=body["email"], password=body["password"], rating=body["rating"])
    db.session.add(chef)
    db.session.commit()
    # response_body = {
    #     "se creo el chef ": chef.serialize()
    # }

    access_token = create_access_token(identity=body["email"])
    return jsonify(access_token=access_token), 200

    # return jsonify(response_body), 200

