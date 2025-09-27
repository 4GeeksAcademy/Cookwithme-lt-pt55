"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Chef, Utensil, Ingredient, Admin_user, Question, Answer, Recipe, Calification, Utensil_recipe, Recipe_ingredient, Utensil_user, Ingredient_user, Fav_recipe
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
    results = list(map(lambda user: user.serialize(), all_users))
    return jsonify(results), 200


@api.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.filter_by(id=user_id).first()
    if user is None:
        return {"error-msg": "enter a valid user"}, 400
    return jsonify(user.serialize()), 200

@api.route('/user_info', methods=['GET'])
@jwt_required()
def get_current_user_info():
    current_user_id = get_jwt_identity()
    user = User.query.filter_by(email=current_user_id).first()
    if user is None:
        return {"error-msg": "enter a valid user"}, 400
    return jsonify(user.serialize()), 200


@api.route('/users', methods=['POST'])
def add_user():
    body = request.get_json()
    user = User(username=body["username"], name=body["name"],
                password=body["password"], email=body["email"])
    db.session.add(user)
    db.session.commit()
    response_body = {
        "se creo el usuario ": user.serialize()
    }
    return jsonify(response_body), 200


@api.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.filter_by(id=user_id).first()
    if user is None:
        return {"error-msg": "enter a valid user"}, 400
    db.session.delete(user)
    db.session.commit()
    response_body = {
        "message": "se elimino el user " + user.email
    }
    return jsonify(response_body), 200


@api.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.filter_by(id=user_id).first()
    if user is None:
        return jsonify({"error-msg": "user does not exist"}), 404

    body = request.get_json()

    if "username" in body:
        user.username = body["username"]
    if "name" in body:
        user.name = body["name"]
    if "email" in body:
        user.email = body["email"]
    if "image_url" in body:
        user.image_url = body["image_url"]

    # user.username = body.get("username", user.username)
    # user.name = body.get("name", user.name)
    # user.password = body.get("password", user.password)
    # user.email = body.get("email", user.email)
    # user.image_url = body.get("image_url", user.image_url)

    db.session.commit()

    response_body = {
        "message": f"Usuario {user.id} actualizado correctamente",
        "user": user.serialize()
    }
    return jsonify(response_body), 200

@api.route('/users', methods=['PUT'])
@jwt_required()
def update_current_user():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    if user is None:
        return {"error-msg": "user does not exist"}, 400

    body = request.get_json()
    if "username" in body:
        user.username = body["username"]
    if "name" in body:
        user.name = body["name"]
    if "email" in body:
        user.email = body["email"]
    if "image_url" in body:
        user.image_url = body["image_url"]
        
    db.session.commit()
    response_body = {
        "message": "User" + user.name + " successfully update"
    }

    return jsonify(response_body), 200

# ------chef------------------


@api.route('/chefs', methods=['GET'])
def get_all_chef():
    all_chefs = Chef.query.all()
    results = list(map(lambda chef: chef.serialize(), all_chefs))
    return jsonify(results), 200


@api.route('/chefs/<int:chef_id>', methods=['GET'])
def get_chef(chef_id):
    chef = Chef.query.filter_by(id=chef_id).first()
    if chef is None:
        return {"error-msg": "enter a valid chef"}, 400
    return jsonify(chef.serialize()), 200


@api.route('/chef_info', methods=['GET'])
@jwt_required()
def get_current_chef_info():
    current_chef_id = get_jwt_identity()
    chef = Chef.query.filter_by(email=current_chef_id).first()
    if chef is None:
        return {"error-msg": "enter a valid chef"}, 400
    return jsonify(chef.serialize()), 200


@api.route('/chefs/<int:chef_id>', methods=['DELETE'])
def delete_chef(chef_id):
    chef = Chef.query.filter_by(id=chef_id).first()
    if chef is None:
        return {"error-msg": "enter a valid chef"}, 400
    db.session.delete(chef)
    db.session.commit()
    response_body = {
        "message": "se elimino el chef " + chef.name
    }

    return jsonify(response_body), 200


@api.route('/chefs', methods=['POST'])
def add_chef():
    body = request.get_json()
    chef = Chef(name=body["name"], email=body["email"],
                rating=body["rating"], password=body["password"])
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
        return {"error-msg": "chef does not exist"}, 400

    body = request.get_json()
    if "name" in body:
        chef.name = body["name"]
    if "email" in body:
        chef.email = body["email"]
    if "rating" in body:
        chef.rating = body["rating"]
    if "image_url" in body:
        chef.image_url = body["image_url"]

    db.session.commit()
    response_body = {
        "message": "chef " + chef.name + " successfully update"
    }

    return jsonify(response_body), 200


@api.route('/chefs', methods=['PUT'])
@jwt_required()
def update_current_chef():
    current_chef_email = get_jwt_identity()
    chef = Chef.query.filter_by(email=current_chef_email).first()
    if chef is None:
        return {"error-msg": "chef does not exist"}, 400

    body = request.get_json()
    if "name" in body:
        chef.name = body["name"]
    if "email" in body:
        chef.email = body["email"]
    if "rating" in body:
        chef.rating = body["rating"]
    if "image_url" in body:
        chef.image_url = body["image_url"]

    db.session.commit()
    response_body = {
        "message": "chef " + chef.name + " successfully update"
    }

    return jsonify(response_body), 200

# -------------------  utensilios ----------------------------------------


@api.route('/utensils', methods=['GET'])
def get_all_utensil():
    all_utensils = Utensil.query.all()
    results = list(map(lambda utensil: utensil.serialize(), all_utensils))
    return jsonify(results), 200


@api.route('/utensils/<int:utensil_id>', methods=['GET'])
def get_utensil(utensil_id):
    utensil = Utensil.query.filter_by(id=utensil_id).first()
    if utensil is None:
        return {"error-msg": "enter a valid utensil"}, 400
    return jsonify(utensil.serialize()), 200


@api.route('/utensils/<int:utensil_id>', methods=['DELETE'])
def delete_utensil(utensil_id):
    utensil = Utensil.query.filter_by(id=utensil_id).first()
    if utensil is None:
        return {"error-msg": "enter a valid utensil"}, 400
    db.session.delete(utensil)
    db.session.commit()
    response_body = {
        "message": "se elimino el chef " + utensil.name
    }

    return jsonify(response_body), 200


@api.route('/utensils', methods=['POST'])
def add_utensil():
    body = request.get_json()
    utensil = Utensil(
        name=body["name"], description=body["description"], url_img=body["url_img"])
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
    utensil.url_img = body.get("url_img", utensil.url_img)
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
    results = list(
        map(lambda ingredient: ingredient.serialize(), all_ingredients))
    return jsonify(results), 200


@api.route('/ingredients/<int:ingredient_id>', methods=['GET'])
def get_ingredient(ingredient_id):
    ingredient = Ingredient.query.filter_by(id=ingredient_id).first()
    if ingredient is None:
        return {"error-msg": "enter a valid ingredient"}, 400
    return jsonify(ingredient.serialize()), 200


@api.route('/ingredients/<int:ingredient_id>', methods=['DELETE'])
def delete_ingredient(ingredient_id):
    ingredient = Ingredient.query.filter_by(id=ingredient_id).first()
    if ingredient is None:
        return {"error-msg": "enter a valid ingredient"}, 400
    db.session.delete(ingredient)
    db.session.commit()
    response_body = {
        "message": "se elimino el ingredient " + ingredient.name
    }

    return jsonify(response_body), 200


@api.route('/ingredients', methods=['POST'])
def add_ingredient():
    body = request.get_json()
    ingredient = Ingredient(
        name=body["name"], description=body["description"], image=body["image"])
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
    results = list(map(lambda adminuser: adminuser.serialize(), all_admins))
    return jsonify(results), 200


@api.route('/adminuser/<int:adminuser_id>', methods=['GET'])
def get_admin(adminuser_id):
    admin = Admin_user.query.filter_by(id=adminuser_id).first()
    if admin is None:
        return {"error-msg": "enter a valid admin"}, 400
    return jsonify(admin.serialize()), 200


@api.route('/adminuser/<int:adminuser_id>', methods=['DELETE'])
def delete_admin(adminuser_id):
    adminuser = Admin_user.query.filter_by(id=adminuser_id).first()
    if adminuser is None:
        return {"error-msg": "enter a valid Admin User"}, 400
    db.session.delete(adminuser)
    db.session.commit()
    admin_response_body = {
        "message": "se elimino el Admin " + adminuser.email}
    return jsonify(admin_response_body), 200


@api.route('/adminuser', methods=['POST'])
def add_admin():
    admin_body = request.get_json()
    admin = Admin_user(
        email=admin_body["email"], password=admin_body["password"])
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
    results = list(map(lambda recipe: recipe.serialize(), all_recipes))
    return jsonify(results), 200


@api.route('/recipes/<int:recipe_id>', methods=['GET'])
def get_recipe(recipe_id):
    recipe = Recipe.query.filter_by(id=recipe_id).first()
    if recipe is None:
        return {"error-msg": "enter a valid recipe"}, 400
    return jsonify(recipe.serialize()), 200


@api.route('/recipes', methods=['POST'])
def add_recipe():

    body = request.get_json()
    utensils_data = body.get("utensils", None)

    recipe = Recipe(name=body["name"], description=body["description"],
                    img=body["img"], preparation=body["preparation"], chef_id=body["chef_id"], utensils=utensils_data)
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
        return {"error-msg": "enter a valid recipe"}, 400
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
        return {"error-msg": "recipe does not exist"}, 400

    body = request.get_json()
    if "name" in body:
        recipe.name = body["name"]

    if "description" in body:
        recipe.description = body["description"]

    if "preparation" in body:
        recipe.preparation = body["preparation"]

    if "img" in body:
        recipe.img = body["img"]

    if "chef_id" in body:
        recipe.chef_id = body["chef_id"]

    db.session.commit()
    response_body = {
        "message": "recipe " + recipe.name + " successfully update"
    }

    return jsonify(response_body), 200

    # #--------Question-----------------------


@api.route('/questions', methods=['GET'])
def get_all_questions():
    all_questions = Question.query.all()
    results = list(map(lambda question: question.serialize(), all_questions))
    return jsonify(results), 200


@api.route('/questions/<int:question_id>', methods=['GET'])
def get_question(question_id):
    question = Question.query.filter_by(id=question_id).first()
    if question is None:
        return {"error-msg": "enter a valid question"}, 400
    return jsonify(question.serialize()), 200


@api.route('/questions/<int:question_id>', methods=['DELETE'])
def delete_question(question_id):
    question = Question.query.filter_by(id=question_id).first()
    if question is None:
        return {"error-msg": "enter a valid question"}, 400
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


# ----------------utensilios a las recetas--------------------------
@api.route('/utensil_recipe', methods=['POST'])
def add_utensil_recipe():
    body = request.get_json()

    recipe_id_got = body.get("recipe_id")
    utensil_id_got = body.get("utensil_id")

    if not recipe_id_got or not utensil_id_got:
        return jsonify({"error": "recipe_id y utensil_id son requeridos"}), 400

    new_utensil_recipe = Utensil_recipe(
        recipe_id=recipe_id_got, utensil_id=utensil_id_got)
    db.session.add(new_utensil_recipe)
    db.session.commit()

    return jsonify(new_utensil_recipe.serialize()), 201


@api.route('/utensil_recipe', methods=['GET'])
def get_all_utensil_recipe():
    all_relations = Utensil_recipe.query.all()
    results = list(map(lambda relation: relation.serialize(), all_relations))
    return jsonify(results), 200


@api.route('/utensil_recipe/<int:utensil_recipe_id>', methods=['GET'])
def get_utensil_recipe(utensil_recipe_id):
    relation = Utensil_recipe.query.get(utensil_recipe_id)
    if relation is None:
        return jsonify({"error": "Relation not found"}), 404
    return jsonify(relation.serialize()), 200


@api.route('/utensil_recipe/<int:utensil_recipe_id>', methods=['DELETE'])
def delete_utensil_recipe(utensil_recipe_id):
    relation = Utensil_recipe.query.get(utensil_recipe_id)
    if relation is None:
        return jsonify({"error": "Relation not found"}), 404

    db.session.delete(relation)
    db.session.commit()
    return jsonify({"message": f"Relation {utensil_recipe_id} deleted successfully"}), 200


@api.route('/utensil_recipe/<int:utensil_recipe_id>', methods=['PUT'])
def update_utensil_recipe(utensil_recipe_id):
    relation = Utensil_recipe.query.get(utensil_recipe_id)
    if relation is None:
        return jsonify({"error": "Relation not found"}), 404

    body = request.get_json()
    recipe_id = body.get("recipe_id", relation.recipe_id)
    utensil_id = body.get("utensil_id", relation.utensil_id)

    relation.recipe_id = recipe_id
    relation.utensil_id = utensil_id

    db.session.commit()
    return jsonify({
        "message": f"Relation {relation.id} updated successfully",
        "relation": relation.serialize()
    }), 200


# ----Calification---------------------------------------------

@api.route('/calification', methods=['GET'])
def get_all_calification():
    all_calification = Calification.query.all()
    results = list(
        map(lambda calification: calification.serialize(), all_calification))
    return jsonify(results), 200


@api.route('/calification/<int:calification_id>', methods=['GET'])
def get_calification(calification_id):
    calification = Calification.query.filter_by(id=calification_id).first()
    if calification is None:
        return {"error-msg": "enter a valid Calification"}, 400
    return jsonify(calification.serialize()), 200


@api.route('/calification/<int:calification_id>', methods=['DELETE'])
def delete_calification(calification_id):
    calification = Calification.query.filter_by(id=calification_id).first()
    if calification is None:
        return {"error-msg": "enter a valid Admin User"}, 400
    db.session.delete(calification)
    db.session.commit()
    stars_response_body = {
        "message": "se elimino la calificacion "}
    return jsonify(stars_response_body), 200


@api.route('/calification', methods=['POST'])
def add_calification():
    calification_body = request.get_json()
    calification = Calification(
        stars=calification_body["stars"], user_id=calification_body["user_id"], recipe_id=calification_body["recipe_id"])
    db.session.add(calification)
    db.session.commit()
    admin_response_body = {
        "Se registro una nueva reseña": calification.serialize()
    }

    return jsonify(admin_response_body), 200


@api.route('/calification/<int:calification_id>', methods=['PUT'])
def update_calification(calification_id):
    calification = Calification.query.filter_by(id=calification_id).first()
    if calification is None:
        return jsonify({"error-msg": "review does not exist"}), 404

    review_body = request.get_json()
    calification.stars = review_body.get("stars", calification.stars)
    db.session.commit()
    calification_response_body = {
        "message": f"Admin {calification.id} updated successfully",
        "calification": calification.serialize()
    }

    return jsonify(calification_response_body), 200

# ----Fav_Recipes---------------------------------------------


@api.route('/recipe/fav_recipes', methods=['GET'])
def get_all_favrecipes():
    all_favrecipes = Fav_recipe.query.all()
    results = list(
        map(lambda favrecipes: favrecipes.serialize(), all_favrecipes))
    return jsonify(results), 200


@api.route('/recipe/fav_recipes/<int:fav_recipe_id>', methods=['GET'])
def get_favrecipes(favrecipe_id):
    favrecipe = Fav_recipe.query.filter_by(id=favrecipe_id).first()
    if favrecipe is None:
        return {"error-msg": "enter a valid Calification"}, 400
    return jsonify(favrecipe.serialize()), 200


@api.route('/recipe/fav_recipes/<int:fav_recipe_id>', methods=['DELETE'])
def delete_favrecipe(favrecipes_id):
    favrecipes = Fav_recipe.query.filter_by(id=favrecipes_id).first()
    if favrecipes is None:
        return {"error-msg": "enter a valid Admin User"}, 400
    db.session.delete(favrecipes)
    db.session.commit()
    stars_response_body = {
        "message": "se elimino la calificacion "}
    return jsonify(stars_response_body), 200


@api.route('/recipe/fav_recipes', methods=['POST'])
def add_favrecipes():
    favrecipes_body = request.get_json()
    favrecipes = Fav_recipe(
        user_id=favrecipes_body["user_id"], recipe_id=favrecipes_body["recipe_id"])
    db.session.add(favrecipes)
    db.session.commit()
    admin_response_body = {
        "Se registro una nueva reseña": favrecipes.serialize()
    }

    return jsonify(admin_response_body), 200


# ------------------- Log in Chef -----------------------


@api.route('/chef_home', methods=['GET'])
@jwt_required()
def chef_home():

    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


@api.route('/chef_recipes/<int:recipe_id>', methods=['GET'])
@jwt_required()
def get_single_chef_recipe(recipe_id):
    recipe = Recipe.query.filter_by(id=recipe_id).first()
    if recipe is None:
        return {"error-msg": "enter a valid recipe"}, 400
    return jsonify(recipe.serialize()), 200


@api.route("/login_chef", methods=["POST"])
def login_as_chef():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    chef = Chef.query.filter_by(email=email).first()
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

    chef = Chef(name=body["name"], email=body["email"],
                password=body["password"], rating=body["rating"])

    db.session.add(chef)
    db.session.commit()
    access_token = create_access_token(identity=body["email"])
    return jsonify(access_token=access_token), 200


@api.route('/chef_recipes', methods=['GET'])
@jwt_required()
def get_current_chef_recipes():
    current_chef = get_jwt_identity()
    chef = Chef.query.filter_by(email=current_chef).first()
    if not chef:
        return jsonify({"msg": "chef not found"}), 400
    recipes = Recipe.query.filter_by(chef_id=chef.id).all()
    results = list(map(lambda recipe: recipe.serialize(), recipes))
    return jsonify(results), 200


@api.route('/chef_recipes', methods=['POST'])
@jwt_required()
def add_current_chef_recipe():
    current_chef_id = get_jwt_identity()
    chef = Chef.query.filter_by(email=current_chef_id).first()
    print(chef, "este es el chef")
    chef_id = chef.id
    print(chef_id, "este es el chef id")
    body = request.get_json()

    utensils_data = body.get("utensils", None)


    recipe = Recipe(
        name=body["name"],
        description=body["description"],
        img=body["img"],
        preparation=body["preparation"],
        utensils=utensils_data,
        chef_id=chef_id

    )

    db.session.add(recipe)
    db.session.commit()
    response_body = {
        "se creo el recipe ": recipe.serialize()
    }

    return jsonify(response_body), 200


@api.route('/chef_recipes/<int:recipe_id>', methods=['DELETE'])
@jwt_required()
def delete_chef_recipe(recipe_id):
    chef_recipe = Recipe.query.filter_by(id=recipe_id).first()
    print(chef_recipe, "id del recipe")
    if chef_recipe is None:
        return {"error-msg": "enter a valid recipe"}, 400
    db.session.delete(chef_recipe)
    db.session.commit()
    response_body = {
        "message": "se elimino el recipe " + chef_recipe.name
    }

    return jsonify(response_body), 200


@api.route('/chef_recipes/<int:recipe_id>', methods=['PUT'])
@jwt_required()
def update_current_chef_recipe(recipe_id):
    current_chef_id = get_jwt_identity()
    chef = Chef.query.filter_by(email=current_chef_id).first()
    print(chef, "este es el chef")
    chef_id = chef.id
    print(chef_id, "este es el chef id")
    recipe = Recipe.query.filter_by(id=recipe_id).first()
    if recipe is None:
        return {"error-msg": "recipe does not exist"}, 400

    body = request.get_json()
    if "name" in body:
        recipe.name = body["name"]

    if "description" in body:
        recipe.description = body["description"]

    if "preparation" in body:
        recipe.preparation = body["preparation"]

    if "img" in body:
        recipe.img = body["img"]

    if "chef_id" in body:
        recipe.chef_id = chef_id

    db.session.commit()
    response_body = {
        "message": "recipe " + recipe.name + " successfully update"
    }

    return jsonify(response_body), 200


# ------------------- Log in Admin -----------------------


@api.route('/testadm', methods=['GET'])
@jwt_required()
def test_adm():

    current_admin = get_jwt_identity()
    return jsonify(logged_in_as=current_admin), 200


@api.route("/login_admin", methods=["POST"])
def login_as_admin():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    adminu = Admin_user.query.filter_by(email=email).first()
    if adminu is None:
        return jsonify({"msg": "Bad email or password"}), 401
    print(adminu)
    if password != adminu.password:
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

# ------------------- recipe_ingredient -----------------------


@api.route('/recipe_ingredients', methods=['GET'])
def get_all_recipe_ingredients():
    all_records = Recipe_ingredient.query.all()
    results = list(map(lambda ri: ri.serialize(), all_records))
    return jsonify(results), 200


@api.route('/recipe_ingredients/<int:ri_id>', methods=['GET'])
def get_recipe_ingredient(ri_id):
    record = Recipe_ingredient.query.filter_by(id=ri_id).first()
    if record is None:
        return {"error-msg": "enter a valid recipe_ingredient"}, 400
    return jsonify(record.serialize()), 200


@api.route('/recipe_ingredients', methods=['POST'])
def add_recipe_ingredient():
    body = request.get_json()
    recipe_id = body.get("recipe_id")
    ingredient_id = body.get("ingredient_id")

    if not recipe_id or not ingredient_id:
        return jsonify({"error-msg": "recipe_id and ingredient_id are required"}), 400

    new_record = Recipe_ingredient(
        recipe_id=recipe_id, ingredient_id=ingredient_id)
    db.session.add(new_record)
    db.session.commit()
    response_body = {
        "message": "Recipe_ingredient created",
        "data": new_record.serialize()
    }
    return jsonify(response_body), 201


@api.route('/recipe_ingredients/<int:ri_id>', methods=['PUT'])
def update_recipe_ingredient(ri_id):
    record = Recipe_ingredient.query.filter_by(id=ri_id).first()
    if record is None:
        return jsonify({"error-msg": "recipe_ingredient does not exist"}), 404

    body = request.get_json()
    record.recipe_id = body.get("recipe_id", record.recipe_id)
    record.ingredient_id = body.get("ingredient_id", record.ingredient_id)
    db.session.commit()

    response_body = {
        "message": f"Recipe_ingredient {record.id} updated successfully",
        "data": record.serialize()
    }
    return jsonify(response_body), 200


@api.route('/recipe_ingredients/<int:ri_id>', methods=['DELETE'])
def delete_recipe_ingredient(ri_id):
    record = Recipe_ingredient.query.filter_by(id=ri_id).first()
    if record is None:
        return jsonify({"error-msg": "enter a valid recipe_ingredient"}), 400

    db.session.delete(record)
    db.session.commit()

    response_body = {
        "message": f"Recipe_ingredient {ri_id} deleted successfully"
    }
    return jsonify(response_body), 200

# --------utensil_user---------


@api.route('/utensil_user', methods=['POST'])
def add_utensil_user():
    body = request.get_json()
    user_id_got = body.get("user_id")
    utensil_id_got = body.get("utensil_id")

    if not user_id_got or not utensil_id_got:
        return jsonify({"error": "user_id y utensil_id son requeridos"}), 400

    new_utensil_user = Utensil_user(
        user_id=user_id_got, utensil_id=utensil_id_got)
    db.session.add(new_utensil_user)
    db.session.commit()

    return jsonify(new_utensil_user.serialize()), 201


@api.route('/utensil_user', methods=['GET'])
def get_all_utensil_user():
    all_relations = Utensil_user.query.all()
    results = list(map(lambda relation: relation.serialize(), all_relations))
    return jsonify(results), 200


@api.route('/utensil_user/<int:utensil_user_id>', methods=['GET'])
def get_utensil_user(utensil_user_id):
    relation = Utensil_user.query.get(utensil_user_id)
    if relation is None:
        return jsonify({"error": "Relation not found"}), 404
    return jsonify(relation.serialize()), 200


@api.route('/utensil_user/<int:utensil_user_id>', methods=['DELETE'])
def delete_utensil_user(utensil_user_id):
    relation = Utensil_user.query.get(utensil_user_id)
    if relation is None:
        return jsonify({"error": "Relation not found"}), 404

    db.session.delete(relation)
    db.session.commit()
    return jsonify({"message": f"Relation {utensil_user_id} deleted successfully"}), 200


@api.route('/utensil_user/<int:utensil_user_id>', methods=['PUT'])
def update_utensil_user(utensil_user_id):
    relation = Utensil_user.query.get(utensil_user_id)
    if relation is None:
        return jsonify({"error": "Relation not found"}), 404

    body = request.get_json()
    user_id = body.get("user_id", relation.user_id)
    utensil_id = body.get("utensil_id", relation.utensil_id)

    relation.user_id = user_id
    relation.utensil_id = utensil_id

    db.session.commit()
    return jsonify({
        "message": f"Relation {relation.id} updated successfully",
        "relation": relation.serialize()
    }), 200

    # ----------------login user


@api.route("/login_user", methods=["POST"])
def login_as_user():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # consulta a la tabla de class
    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"msg": "Bad email or password"}), 401
    print(user)
    if password != user.password:
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify({
        "access_token": access_token,
        "user": user.serialize()  
    }), 200


@api.route('/signup_user', methods=['POST'])
def signup_as_user():
    body = request.get_json()
    user = User.query.filter_by(email=body["email"]).first()
    if user:
        return jsonify({"msg": "user already exist"}), 401

    user = User(
        email=body["email"],
        username=body["username"],
        name=body["name"],
        password=body["password"]
    )
    db.session.add(user)
    db.session.commit()

    access_token = create_access_token(identity=body["email"])
    return jsonify(access_token=access_token), 200


@api.route('/home_user', methods=['GET'])
@jwt_required()
def home_user():

    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

# --------Ingredient_user---------


@api.route('/ingredient_users', methods=['GET'])
def get_all_ingredient_users():
    ingredient_users = Ingredient_user.query.all()
    results = [iu.serialize() for iu in ingredient_users]
    return jsonify(results), 200


@api.route('/ingredient_users/<int:iu_id>', methods=['GET'])
def get_ingredient_user(iu_id):
    ingredient_user = Ingredient_user.query.filter_by(id=iu_id).first()
    if ingredient_user is None:
        return jsonify({"error-msg": "enter a valid ingredient_user"}), 400
    return jsonify(ingredient_user.serialize()), 200


@api.route('/ingredient_users', methods=['POST'])
def add_ingredient_user():
    body = request.get_json()
    ingredient_id = body.get("ingredient_id")
    user_id = body.get("user_id")

    if not ingredient_id or not user_id:
        return jsonify({"error-msg": "ingredient_id and user_id are required"}), 400

    new_ingredient_user = Ingredient_user(
        ingredient_id=ingredient_id, user_id=user_id)
    db.session.add(new_ingredient_user)
    db.session.commit()

    response_body = {
        "message": "Ingredient_user created",
        "data": new_ingredient_user.serialize()
    }
    return jsonify(response_body), 201


@api.route('/ingredient_users/<int:iu_id>', methods=['PUT'])
def update_ingredient_user(iu_id):
    ingredient_user = Ingredient_user.query.filter_by(id=iu_id).first()
    if ingredient_user is None:
        return jsonify({"error-msg": "ingredient_user does not exist"}), 404

    body = request.get_json()
    ingredient_user.ingredient_id = body.get(
        "ingredient_id", ingredient_user.ingredient_id)
    ingredient_user.user_id = body.get("user_id", ingredient_user.user_id)
    db.session.commit()

    response_body = {
        "message": f"Ingredient_user {ingredient_user.id} updated successfully",
        "data": ingredient_user.serialize()
    }
    return jsonify(response_body), 200


@api.route('/ingredient_users/<int:iu_id>', methods=['DELETE'])
def delete_ingredient_user(iu_id):
    ingredient_user = Ingredient_user.query.filter_by(id=iu_id).first()
    if ingredient_user is None:
        return jsonify({"error-msg": "enter a valid ingredient_user"}), 400

    db.session.delete(ingredient_user)
    db.session.commit()

    response_body = {
        "message": f"Ingredient_user {iu_id} deleted successfully"
    }
    return jsonify(response_body), 200

# ---- Favoritos de recetas por usuario ----

# Obtener todos los favoritos del usuario logueado
@api.route('/user/fav_recipes', methods=['GET'])
@jwt_required()
def get_user_favrecipes():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    favs = Fav_recipe.query.filter_by(user_id=user.id).all()
    results = [fav.serialize() for fav in favs]

    return jsonify(results), 200


# Agregar receta a favoritos (del usuario logueado)
@api.route('/user/fav_recipes', methods=['POST'])
@jwt_required()
def add_user_favrecipe():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    body = request.get_json()
    recipe_id = body.get("recipe_id")

    if not recipe_id:
        return jsonify({"error": "recipe_id is required"}), 400

    # Validar que no esté repetido
    existing_fav = Fav_recipe.query.filter_by(user_id=user.id, recipe_id=recipe_id).first()
    if existing_fav:
        return jsonify({"msg": "Recipe already in favorites"}), 400

    fav = Fav_recipe(user_id=user.id, recipe_id=recipe_id)
    db.session.add(fav)
    db.session.commit()

    return jsonify(fav.serialize()), 201


# Eliminar receta de favoritos del usuario logueado
@api.route('/user/fav_recipes/<int:recipe_id>', methods=['DELETE'])
@jwt_required()
def delete_user_favrecipe(recipe_id):
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    fav = Fav_recipe.query.filter_by(user_id=user.id, recipe_id=recipe_id).first()
    if not fav:
        return jsonify({"error": "Favorite not found"}), 404

    db.session.delete(fav)
    db.session.commit()

    return jsonify({"msg": f"Recipe {recipe_id} removed from favorites"}), 200

# -----se crea para ver los resultado de recetas disponibles segun ingredientes y utensilios
@api.route('/user/available_recipes', methods=['GET'])
@jwt_required()
def get_available_recipes():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Ingredientes y utensilios del usuario
    selected_ingredient_ids = [iu.ingredient_id for iu in Ingredient_user.query.filter_by(user_id=user.id)]
    selected_utensil_ids = [uu.utensil_id for uu in Utensil_user.query.filter_by(user_id=user.id)]

    available_recipes = []

    for recipe in Recipe.query.all():
        recipe_ingredient_ids = [ri.ingredient_id for ri in Recipe_ingredient.query.filter_by(recipe_id=recipe.id)]
        recipe_utensil_ids = [ur.utensil_id for ur in Utensil_recipe.query.filter_by(recipe_id=recipe.id)]

        # Solo si la receta contiene todos los ingredientes seleccionados y utensilios seleccionados
        if set(selected_ingredient_ids).issubset(recipe_ingredient_ids) and set(selected_utensil_ids).issubset(recipe_utensil_ids):
            available_recipes.append(recipe.serialize())

    return jsonify(available_recipes), 200

# --------------
@api.route('/ingredient_users_bulk', methods=['POST'])
@jwt_required()
def ingredient_users_bulk():
    user_id = request.json.get("user_id")
    ingredient_ids = request.json.get("ingredient_ids", [])
    utensil_ids = request.json.get("utensil_ids", [])

    if not user_id:
        return jsonify({"error": "user_id required"}), 400

    # Limpiar selecciones previas
    Ingredient_user.query.filter_by(user_id=user_id).delete()
    Utensil_user.query.filter_by(user_id=user_id).delete()
    db.session.commit()

    # Agregar nuevas selecciones de ingredientes
    for ing_id in ingredient_ids:
        iu = Ingredient_user(user_id=user_id, ingredient_id=ing_id)
        db.session.add(iu)

    # Agregar nuevas selecciones de utensilios
    for ut_id in utensil_ids:
        uu = Utensil_user(user_id=user_id, utensil_id=ut_id)
        db.session.add(uu)

    db.session.commit()
    return jsonify({"msg": "Selections updated"}), 201

@api.route('/signup_admin', methods=['POST'])
def signup_as_admin():
    adminu_body = request.get_json()
    adminu = Admin_user.query.filter_by(email=adminu_body ["email"]).first()
    if adminu:
        return jsonify({"msg": "Admin already exist"}), 401

    adminu = Admin_user( email=adminu_body["email"],password=adminu_body["password"],)
    db.session.add(adminu)
    db.session.commit()
    access_token = create_access_token(identity=adminu_body["email"])
    return jsonify(access_token=access_token), 200

