import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link, useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

const UserProfile = () => {

    const navigate = useNavigate();

    const [urlImg, setUrlImg] = useState("")

    const [user, setUser] = useState([])

    const { chef_id } = useParams() || {};

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const changeUploadImage = async (e) => {
        const file = e.target.files[0];

        const formData = new FormData()

        formData.append('file', file)
        formData.append('upload_preset', 'user_image')
        formData.append('cloud_name', 'dxuqapamg')

        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/dxuqapamg/image/upload", {
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

    function updateImage(e) {
        e.preventDefault();

        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("tokenUser")
            },
            body: JSON.stringify({ image_url: urlImg }),
        };

        fetch(backendUrl + `/api/users`, requestOptions)
            .then(response => response.json())
            .then((data) => {
                console.log("user updated:", data);
                setUrlImg(null)
                getUserInfo()
                if (!store.authUser)
                    return navigate("/login_user")
            })
    }

    useEffect(() => {
        getUserInfo()
    }, []);

    function getUserInfo() {
        const token = localStorage.getItem("tokenUser")
        fetch(backendUrl + `/api/user_info`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setUser(data)
            }
            )
    }


    const { store, dispatch } = useGlobalReducer()

    return (
        <div>
            {store.authUser ?
                <>
                    <div className="container text-center">
                        {user && user.name ? (
                            <>
                                <h2>{user.name}</h2>
                                <p>Email: {user.email}</p>
                                <p>Username: {user.username}</p>
                                <img src={user.image_url} alt="" />


                                <div>
                                    <input type="file" accept="image/*" onChange={changeUploadImage} />
                                    {urlImg && (
                                        <div>
                                            <img src={urlImg} alt="" />
                                        </div>
                                    )}
                                </div>
                                <button onClick={updateImage}>Save Image</button>
                                <Link to={"/user/" + user.id + "/update"}>
                                    <button className="btn btn-warning">Edit personal info</button>
                                </Link>
                            </>
                        ) : (
                            <p>Loading usr info...</p>
                        )}
                    </div>
                </>
                :
                <h1>Tienes que autenticarte</h1>
            }
        </div>

    )
}

export default UserProfile
