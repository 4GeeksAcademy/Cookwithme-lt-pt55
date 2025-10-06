
import click
from api.models import db, User, Chef, Ingredient, Utensil

"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration
with youy database, for example: Import the price of bitcoin every night as 12am
"""


def setup_commands(app):
    """
    This is an example command "insert-test-users" that you can run from the command line
    by typing: $ flask insert-test-users 5
    Note: 5 is the number of users to add
    """
    @app.cli.command("insert-test-users")  # name of our command
    @click.argument("count")  # argument of out command
    def insert_test_users(count):
        print("Creating test users")
        for x in range(1, int(count) + 1):
            user = User()
            user.email = "test_user" + str(x) + "@test.com"
            user.password = "123456"
            user.is_active = True
            user.username = "Test"
            user.image_url = "/"
            user.name = "User-Test"
            db.session.add(user)
            db.session.commit()
            print("User: ", user.email, " created.")

        print("All test users created")

    @app.cli.command("insert-test-chefs")  # name of our command
    @click.argument("count")  # argument of out command
    def insert_test_chefs(count):
        print("Creating test chefs")
        for x in range(1, int(count) + 1):
            chef = Chef()
            chef.email = "test_chef" + str(x) + "@test.com"
            chef.password = "123456"
            chef.rating = "5"
            chef.image_url = "/"
            chef.name = "Chef-Test"
            db.session.add(chef)
            db.session.commit()
            print("Chef: ", chef.email, " created.")

        print("All test chefs created")

    @app.cli.command("insert-test-ingredients")  # name of our command
    @click.argument("count")  # argument of out command
    def insert_test_ingredients(count):
        print("Creating test ingredients")
        for x in range(1, int(count) + 1):
            ingredient = Ingredient()
            ingredient.image = "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSRgtJF2-CjGrCFU0GPszrh22NPv3eHSLXZGKmX3twbN1NoYzNXsnYUCs02o2vw-8wtmmu1ePTiVvfljeJJFU0J-W-AHvkpvP6784g9YdZXqw"
            ingredient.description = "Test"
            ingredient.name = "Ingredient-Test" + str(x)
            db.session.add(ingredient)
            db.session.commit()
            print("Ingredient: ", ingredient.name, " created.")

        print("All test ingredients created")

    @app.cli.command("insert-test-utensils")  # name of our command
    @click.argument("count")  # argument of out command
    def insert_test_utensils(count):
        print("Creating test utensils")
        for x in range(1, int(count) + 1):
            utensil = Utensil()
            utensil.url_img = "https://m.media-amazon.com/images/I/51X0jzGB9NL._UF894,1000_QL80_.jpg"
            utensil.description = "Test"
            utensil.name = "Utensil-Test" + str(x)
            db.session.add(utensil)
            db.session.commit()
            print("Utensil: ", utensil.name, " created.")

        print("All test utensil created")


    @app.cli.command("insert-test-data")
    def insert_test_data():
        insert_test_users("3")
        insert_test_chefs("3")
        insert_test_ingredients("3")
        insert_test_utensils("3")
