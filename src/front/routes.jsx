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
import { Ingrediente } from "./pages/Ingrediente";
import { SingleIngrediente } from "./pages/SingleIngrediente";
import NewIngrediente from "./pages/NewIngrediente";
import { EditUtensilio } from "./pages/EditUtensilio";
import {EditIngrediente} from "./pages/EditIngrediente";
import NewUtensilio from "./pages/NewUtensilio";
import { SingleUtensilio } from "./pages/SingleUtensilio";
import { Utensilio } from "./pages/Utensilio";
import NewChef from "./pages/NewChef";
import NewAdmin from "./pages/NewAdmin";
import { AdminList } from "./pages/AdminList";
import EditAdmin from "./pages/EditAdmin";
import { Question } from "./pages/Question";
import { SingleQuestion } from "./pages/SingleQuestion";
import NewQuestion from "./pages/NewQuestion";
import {EditQuestion} from "./pages/EditQuestion";
import { SingleAdmin } from "./pages/SingleAdmin";
import {EditChef} from "./pages/EditChef";
import { Answer } from "./pages/Answer";
import { SingleAnswer } from "./pages/SingleAnswer";
import NewAnswer from "./pages/NewAnswer";
import { EditAnswer } from "./pages/EditAnswer";
import { Recipe } from "./pages/Recipe";
import { SingleRecipe } from "./pages/SingleRecipe";
import NewRecipe from "./pages/NewRecipe";

import {UtensilioReceta} from "./pages/UtensilToRecipe";
import NewUtensilToRecipe from "./pages/NewUtensilToRecipe";
import { SingleUtensilRecipe } from "./pages/SingleUtensilRecipe";
import { EditUtensilToRecipe } from "./pages/EditUtensilToRecipe";


import { EditRecipe } from "./pages/EditRecipe";
import { LoginChef } from "./pages/LoginChef";
import { HomeChef } from "./pages/HomeChef";
import { SignupChef } from "./pages/SignupChef";




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
        <Route path= "/" element={<Home />} />
        <Route path= "/ingredientes" element={<Ingrediente />} />
        <Route path= "/ingredientes/:ingrediente_id" element={<SingleIngrediente />} />
        <Route path= "/add_ingrediente" element={<NewIngrediente />} />
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
          


        <Route path="/single/:theId" element={ <Single />} />  {/* Dynamic route for single items */}
        <Route path="/demo" element={<Demo />} />

        <Route path= "/chefs" element={<Chef />} />
        <Route path="/chefs/:chef_id" element={ <SingleChef />} />
        <Route path= "/add_chef" element={<NewChef/>} />
        <Route path="/chefs/:chef_id/update" element={<EditChef />} />
        <Route path= "/login_chef" element={<LoginChef />} />
        <Route path= "/test" element={<HomeChef />} />
        <Route path= "/signup_chef" element={<SignupChef />} />

        <Route path= "/add_admin" element={<NewAdmin/>} />
        <Route path= "/adminuser" element={<AdminList/>} />
        <Route path= "/edit_admin/:editAdmId" element={<EditAdmin/>} />
        <Route path= "/adminuser/:admin_id" element={<SingleAdmin />} />
        <Route path= "/adminuser/:admin_id/edit" element={<EditAdmin/>} />

        <Route path= "/questions" element={<Question />} />
        <Route path= "/questions/:question_id" element={<SingleQuestion />} />
        <Route path= "/add_question" element={<NewQuestion />} />
        <Route path="/questions/:question_id/edit" element={<EditQuestion />} />

        <Route path="/answers" element={<Answer />} />
        <Route path="/answers/:answer_id" element={<SingleAnswer />} />
        <Route path="/add_answer" element={<NewAnswer />} />
        <Route path="/answers/:answer_id/edit" element={<EditAnswer />} />

        <Route path= "/recipes" element={<Recipe />} />
        <Route path="/recipes/:recipe_id" element={ <SingleRecipe />} />
        <Route path= "/add_recipe" element={<NewRecipe/>} />
        <Route path="/recipes/:recipe_id/update" element={<EditRecipe />} />

      
      </Route>
    )
);