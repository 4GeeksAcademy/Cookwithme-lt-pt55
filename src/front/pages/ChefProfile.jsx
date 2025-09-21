import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link, useParams } from "react-router-dom"; 
import UploadChefImage from "../components/UploadChefImage.jsx";


const ChefProfile = () => {

    const [chef, setChef] = useState([])

    const { chef_id } = useParams() || {};

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        getChefInfo()
    }, []);

    function getChefInfo() {
        const token = localStorage.getItem("tokenChef")
        fetch(backendUrl + `/api/chef_info`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setChef(data)
            }
            )
    }


    const { store, dispatch } = useGlobalReducer()

    return (
        <div>
            {store.authChef ?
                <>
                    <div className="container text-center">
                        {chef && chef.name ? (
                            <>
                                <h2>{chef.name}</h2>
                                <p>Email: {chef.email}</p>
                                <p>Rating: {chef.rating}</p>
                                {/* Add more chef details here */}

                                <h1>Chef Image</h1>
                                <img src={"https://picsum.photos/200/300"} alt="chef_image" />

                                <UploadChefImage/>

                            </>
                        ) : (
                            <p>Loading chef info...</p>
                        )}
                    </div>
                </>
                :
                <h1>Tienes que autenticarte</h1>
            }
        </div>

    )
}

export default ChefProfile
