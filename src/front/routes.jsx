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
import {EditIngrediente} from "./pages/EditIngrediente";
import { EditUtensilio } from "./pages/EditUtensilio";
import NewUtensilio from "./pages/NewUtensilio";
import { SingleUtensilio } from "./pages/SingleUtensilio";
import { Utensilio } from "./pages/Utensilio";
import NewChef from "./pages/NewChef";
import NewAdmin from "./pages/NewAdmin";
import { AdminList } from "./pages/AdminList";
import EditAdmin from "./pages/EditAdmin";



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
 

        <Route path="/single/:theId" element={ <Single />} />  {/* Dynamic route for single items */}
        <Route path="/demo" element={<Demo />} />

        <Route path= "/chef" element={<Chef />} />
        <Route path="/chef/:chef_id" element={ <SingleChef />} />
        <Route path= "/add_chef" element={<NewChef/>} />
        <Route path= "/add_admin" element={<NewAdmin/>} />
        <Route path= "/adminuser" element={<AdminList/>} />
        <Route path= "/edit_admin/:editAdmId" element={<EditAdmin/>} />
      </Route>
    )
);