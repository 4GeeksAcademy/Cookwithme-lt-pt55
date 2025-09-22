import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link, useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

const ChefProfile = () => {

    const navigate = useNavigate();

    const [urlImg, setUrlImg] = useState("")

    const [chef, setChef] = useState([])

    const { chef_id } = useParams() || {};

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const changeUploadImage = async (e) => {
        const file = e.target.files[0];

        const formData = new FormData()

        formData.append('file', file)
        formData.append('upload_preset', 'chef_image')
        formData.append('cloud_name', 'dwi8lacfr')

        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/dwi8lacfr/image/upload", {
                method: 'POST',
                body: formData
            })

            const data = await response.json()
            console.log(data)

            if (data.secure_url) {
                setUrlImg(data.secure_url)
            } else {
                setError("Failed to upload the image please try again")
            }

        }
        catch (error) {
            console.log(error)
        }
    }

  function updateData(e) {
    e.preventDefault();

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("tokenChef")
      },
      body: JSON.stringify({ image_url: urlImg }),
    };

    fetch(backendUrl + `/api/chefs`, requestOptions)
      .then(response => response.json())
      .then((data) => {
        console.log("Chef actualizado:", data);
        setUrlImg(null)
        getChefInfo()
      if (!store.authChef)
        return navigate("/login_chef")
      })
  }

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
                                <img src={chef.image_url} alt="" />

                                <div>
                                    <input type="file" accept="image/*" onChange={changeUploadImage} />
                                    {urlImg && (
                                        <div>
                                            <img src={urlImg} alt="" />
                                        </div>
                                    )}
                                </div>
                                <button onClick={updateData}>Save Data</button>
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
