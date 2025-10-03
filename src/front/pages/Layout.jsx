import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import  Footer  from "../components/Footer"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {

    const { store, dispatch } = useGlobalReducer()

    return (
        <ScrollToTop>
             {( store.authChef ||store.authUser || store.authAdmin) && ( <Navbar />)}
                 <Outlet />
           <Footer />
        </ScrollToTop>
    )
}