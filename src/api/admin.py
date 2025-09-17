  
import os
from flask_admin import Admin
from .models import db, User, Chef, Utensil,Ingredient,Admin_user,Question, Answer, Recipe,Calification, Recipe_ingredient, Ingredient_user
from flask_admin.contrib.sqla import ModelView



def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    class RecipeAdmin(ModelView):
        column_list = ('id', 'name', 'description', 'img', 'preparation', 'chef')
        form_columns = ('name', 'description', 'img', 'preparation', 'chef')
    
    class CalificationAdmin(ModelView):
        column_list = ('id','stars', 'user', 'recipe')
        form_columns = ('user', 'recipe','stars')

    class Fav_RecipeAdmin(ModelView):
        column_list = ('id', 'user', 'recipe')
        form_columns = ('user', 'recipe')

    
    # Add your models here, for example this is how we add a the User model to the admin
        admin.add_view(ModelView(User, db.session))
        admin.add_view(ModelView(Chef, db.session))
        admin.add_view(ModelView(Utensil, db.session))
        admin.add_view(ModelView(Ingredient, db.session))
        admin.add_view(ModelView(Admin_user, db.session))
        admin.add_view(ModelView(Question, db.session))
        admin.add_view(ModelView(Answer, db.session))
        admin.add_view(CalificationAdmin(Calification, db.session))
        admin.add_view(RecipeAdmin(Recipe, db.session))
        # admin.add_view(Fav_RecipeAdmin(Fav_recipe, db.session))
        admin.add_view(ModelView(Recipe_ingredient, db.session))
        admin.add_view(ModelView(Ingredient_user, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))