// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";

import { Chef } from "./pages/Chef";
import { SingleChef } from "./pages/SingleChef";
import NewChef from "./pages/NewChef";
import { EditChef } from "./pages/EditChef";

import { Ingrediente } from "./pages/Ingrediente";
import { SingleIngrediente } from "./pages/SingleIngrediente";
import NewIngrediente from "./pages/NewIngrediente";
import { EditIngrediente } from "./pages/EditIngrediente";
import { EditUtensilio } from "./pages/EditUtensilio";

import NewUtensilio from "./pages/NewUtensilio";
import { SingleUtensilio } from "./pages/SingleUtensilio";
import { Utensilio } from "./pages/Utensilio";

import NewAdmin from "./pages/Admins/NewAdmin";
import { AdminList } from "./pages/Admins/AdminList";
import EditAdmin from "./pages/Admins/EditAdmin";
import { SingleAdmin } from "./pages/Admins/SingleAdmin";

import { Question } from "./pages/Question";
import { SingleQuestion } from "./pages/SingleQuestion";
import NewQuestion from "./pages/NewQuestion";
import { EditQuestion } from "./pages/EditQuestion";

import { Answer } from "./pages/Answer";
import { SingleAnswer } from "./pages/SingleAnswer";
import NewAnswer from "./pages/NewAnswer";
import { EditAnswer } from "./pages/EditAnswer";

import { Recipe } from "./pages/Recipe";
import { SingleRecipe } from "./pages/SingleRecipe";
import NewRecipe from "./pages/NewRecipe";
import { EditRecipe } from "./pages/EditRecipe";

import {UtensilioReceta} from "./pages/UtensilToRecipe";
import NewUtensilToRecipe from "./pages/NewUtensilToRecipe";
import { SingleUtensilRecipe } from "./pages/SingleUtensilRecipe";
import { EditUtensilToRecipe } from "./pages/EditUtensilToRecipe";

import { Califications } from "./pages/Califications/Reviews";
import NewCalification from "./pages/Califications/NewReview";
import EditCalification from "./pages/Califications/EditReview";

import { LoginChef } from "./pages/LoginChef";
import { HomeChef } from "./pages/HomeChef";
import { SignupChef } from "./pages/SignupChef";
import { LoginAdmin } from "./pages/Admins/LoginAdmin";
import { SignupAdmin } from "./pages/Admins/SignupAdmin";
import { HomeAdmin } from "./pages/HomeAdmin";

import { RecipeIngredient } from "./pages/RecipeIngredient";
import { SingleRecipeIngredient } from "./pages/SingleRecipeIngredient";
import NewRecipeIngredient from "./pages/NewRecipeIngredient";
import { EditRecipeIngredient } from "./pages/EditRecipeIngredient";

import { UtensilToUser } from "./pages/UtensilToUser";
import NewUtensilToUser from "./pages/NewUtensilToUser";
import { SingleUtensilToUser } from "./pages/SingleUtensilToUser";
import { EditUtensilToUser } from "./pages/EditUtensilToUser";

import { Users } from "./pages/Users";
import NewUser from "./pages/NewUser";
import { SingleUser } from "./pages/SingleUser";
import { EditUser } from "./pages/EditUser";
import UserProfile from "./pages/UserProfile";

import { LoginUser } from "./pages/LoginUser";
import { HomeUser } from "./pages/HomeUser";
import { SignupUser } from "./pages/SignupUser";

import { IngredientUser } from "./pages/IngredientUser";
import { SingleIngredientUser } from "./pages/SingleIngredientUser";
import NewIngredientUser from "./pages/NewIngredientUser";
import { EditIngredientUser } from "./pages/EditIngredientUser";
import NewChefRecipe from "./pages/NewChefRecipe";
import EditChefRecipe from "./pages/EditChefRecipe";
import ChefProfile from "./pages/ChefProfile";


export const router = createBrowserRouter(
  createRoutesFromElements(
    // CreateRoutesFromElements function allows you to build route elements declaratively.
    // Create your routes here, if you want to keep the Navbar and Footer in all views, add your new routes inside the containing Route.
    // Root, on the contrary, create a sister Route, if you have doubts, try it!
    // Note: keep in mind that errorElement will be the default page when you don't get a route, customize that page to make your project more attractive.
    // Note: The child paths of the Layout element replace the Outlet component with the elements contained in the "element" attribute of these child paths.

    // Root Route: All navigation will start from here.
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

      {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
      <Route path="/" element={<Home />} />
      <Route path="/ingredientes" element={<Ingrediente />} />
      <Route path="/ingredientes/:ingrediente_id" element={<SingleIngrediente />} />
      <Route path="/add_ingrediente" element={<NewIngrediente />} />
      <Route path="/ingredientes/:ingrediente_id/edit" element={<EditIngrediente />} />

      {/* Utensilios */}
      <Route path="/utensilios" element={<Utensilio />} />
      <Route path="/utensilios/:utensilio_id" element={<SingleUtensilio />} />
      <Route path="/add_utensilio" element={<NewUtensilio />} />
      <Route path="/utensilios/:utensilio_id/edit" element={<EditUtensilio />} />
 
 
                    {/* utensilios en recetas */}
          <Route path="/utensilio_receta" element={<UtensilioReceta />} /> 
          <Route path="/add_utensil_to_recipe" element={<NewUtensilToRecipe />} />
          <Route path="/utensilioreceta/:utensilioreceta_id" element={<SingleUtensilRecipe />} />
          <Route path="/utensilioreceta/:utensilioreceta_id/edit" element={<EditUtensilToRecipe />} />
          



      <Route path="/single/:theId" element={<Single />} />  {/* Dynamic route for single items */}
      <Route path="/demo" element={<Demo />} />
      <Route path= "/chefs" element={<Chef />} />
      <Route path="/chefs/:chef_id" element={ <SingleChef />} />
      <Route path= "/add_chef" element={<NewChef/>} />
      <Route path="/chefs/:chef_id/update" element={<EditChef />} />
      <Route path= "/login_chef" element={<LoginChef />} />
      <Route path= "/chef_home" element={<HomeChef />} />
      <Route path= "/signup_chef" element={<SignupChef />} />

      <Route path= "/new_chef_recipe" element={<NewChefRecipe />} />
      <Route path="/chef_recipes/:recipe_id/update" element={ <EditChefRecipe />} />
      <Route path= "/chef_profile" element={<ChefProfile />} />

      <Route path="/add_admin" element={<NewAdmin />} />
      <Route path="/adminuser" element={<AdminList />} />
      <Route path="/edit_admin/:editAdmId" element={<EditAdmin />} />
      <Route path="/adminuser/:admin_id" element={<SingleAdmin />} />
      <Route path="/adminuser/:admin_id/edit" element={<EditAdmin />} />
      <Route path= "/login_admin" element={<LoginAdmin />} />
      <Route path= "/signup_admin" element={<SignupAdmin />} />
      <Route path= "/testadm" element={<HomeAdmin />} />

      <Route path="/questions" element={<Question />} />
      <Route path="/questions/:question_id" element={<SingleQuestion />} />
      <Route path="/add_question" element={<NewQuestion />} />
      <Route path="/questions/:question_id/edit" element={<EditQuestion />} />

      <Route path="/answers" element={<Answer />} />
      <Route path="/answers/:answer_id" element={<SingleAnswer />} />
      <Route path="/add_answer" element={<NewAnswer />} />
      <Route path="/answers/:answer_id/edit" element={<EditAnswer />} />

      <Route path="/recipes" element={<Recipe />} />
      <Route path="/recipes/:recipe_id" element={<SingleRecipe />} />
      <Route path="/add_recipe" element={<NewRecipe />} />
      <Route path="/recipes/:recipe_id/update" element={<EditRecipe />} />

      <Route path="/califications" element={<Califications />} />
      <Route path="/add_califications" element={<NewCalification />} />
      <Route path="/califications/:review_id/edit" element={<EditCalification />} />

      <Route path="/recipe_ingredients" element={<RecipeIngredient />} />
      <Route path="/recipe_ingredients/:ri_id" element={<SingleRecipeIngredient />} />
      <Route path="/add_recipe_ingredient" element={<NewRecipeIngredient />} />
      <Route path="/recipe_ingredients/:ri_id/edit" element={<EditRecipeIngredient />} />
        
    
      <Route path="/utensil_user" element={<UtensilToUser />} />
      <Route path="/add_utensil_to_user" element={<NewUtensilToUser />} />
      <Route path="/utensiluser/:utensiluser_id" element={<SingleUtensilToUser />} />
      <Route path="/utensiluser/:utensiluser_id/edit" element={<EditUtensilToUser />} />

      <Route path="/users" element={<Users />} />
      <Route path="/users/:user_id" element={<SingleUser />} />
      <Route path="/users/:user_id/edit" element={<EditUser />} />
      <Route path="/add_user" element={<NewUser />} />
      <Route path= "/user_profile" element={<UserProfile />} />
      <Route path= "/login_user" element={<LoginUser/>} />
      <Route path= "/signup_user" element={<SignupUser/>} />
      <Route path= "/home_user" element={<HomeUser/>} />

      <Route path="/ingredient_users" element={<IngredientUser />} />
      <Route path="/ingredient_users/:ingredient_user_id" element={<SingleIngredientUser />} />
      <Route path="/add_ingredient_user" element={<NewIngredientUser />} />
      <Route path="/ingredient_users/:ingredient_user_id/edit" element={<EditIngredientUser />} />

    </Route>
  )
);