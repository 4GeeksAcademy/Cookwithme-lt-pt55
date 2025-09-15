import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export const Califications = () => {

    const [califications, setcalifications] = useState([])

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    function getReviews() {
        fetch(backendUrl + '/api/calification')
            .then(response => response.json())
            .then(data => setcalifications(data))

    }


    function deletereview(calification_id) {

        const requestOptions = {
            method: 'DELETE'
        }
        fetch(backendUrl + '/api/calification/' + calification_id, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                getReviews()
            })

    }


    useEffect(() => {
        getReviews()

    }, [])

    return (
        <>
            <div className="text-center mt-5">
                <h1 className="display-4">users Reviews</h1>

                {/* <div className="dropdown">
                <button clasNames="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown button
                </button>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#"> { califications.map((califications) => (<p key={ califications.id}> { califications.recipe.name} */}


                <ol className="list-group  container w-50">
                    {califications.map((califications) =>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <div className="fw-bold fs-4"><img src={califications.recipe.img} alt="recipe image" className="img-fluid rounded float-start" /></div>
                            <div className="ms-2 me-auto" key={califications.id}>
                                <div className="fw-bold fs-4">{califications.recipe.name}</div>
                                <div>{califications.user.email}</div>
                            </div>
                            <span className="badge text-bg-primary rounded-pill fs-2">{califications.stars} /10
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill m-2" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg></span>
                            <span><button className="btn btn-danger m-2" onClick={() => deletereview(califications.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                </svg>
                            </button></span>
                            <span>
                                <Link to={'/califications/'+ califications.id +'/edit'}> 
                                <button className="btn btn-primary m-2" onClick={() => deletereview(califications.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                                </svg>
                                </button>
                                </Link>
                            </span>
                        </li>)}
                </ol>


                {/* <Link to={"/adminuser/"+ adminuser.id}>
                            <button className="btn btn-primary m-2">Ver Usuario</button>
                    </Link>

                    <Link to={"/adminuser/"+ adminuser.id+"/edit"}>
                        <button className="btn btn-info m-2">Editar Usuario</button>
                    </Link>

                        <button className="btn btn-danger m-2" onClick={()=>deleteadminuser(adminuser.id)}>Eliminar Usuario</button> */}


                {/* <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
            </div>       */}




                <div className="ml-auto">
                    <Link to="/add_califications">
                        <button className="btn btn-success my-3">Registrate</button>
                    </Link>
                </div>



            </div>
        </>
    );
}; 