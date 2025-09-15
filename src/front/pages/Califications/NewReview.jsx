import React, {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";

const NewCalification = () => {

    const navigate = useNavigate()

    const [califications, setcalifications] = useState([])
    const [stars, setStars] = useState('')
     const [user, setuser] = useState('')
    const [recipe, setrecipe] = useState('')

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    


    function sendData(e){
        e.preventDefault()
        
        const requestOptions = {
            method: 'POST',
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(
                {
                "stars": 6,
                 "user_id": 3,
                "recipe_id": 2,
                }
            )
        }
        fetch(backendUrl + '/api/calification', requestOptions)
        .then(response => response.json())
        .then(data => 
            {console.log(data)
            navigate("/califications")
            })
    }

     function getReviews() {
        fetch(backendUrl + '/api/calification')
            .then(response => response.json())
            .then(data => setcalifications(data))}
   

    useEffect(() => {
            getReviews()
    
        }, [])
    

    return (
        <div>
            <form className="w-50 mx-auto" onSubmit={sendData}>
               
                <div >

                <select className="form-select form-select-lg mb-3" aria-label="Large select example"  onChange={(e)=>setrecipe(e.target.value)}  > 
                     {califications.map((califications) => 
                    <option value={califications.recipe.id} key={califications.id}>{califications.recipe.name} </option>
                     )}
                </select> 

                <select className="form-select form-select-lg mb-3" aria-label="Large select example"  onChange={(e)=>setuser(e.target.value)} > 
                     {califications.map((califications) => 
                    <option value={califications.user.id} key={califications.id}>{califications.user.email}</option>
                     )}
                </select> 

                 <label htmlFor="exampleInputPassword1" className="form-label">Calification </label>
                    <input value={stars} onChange={(e)=>setStars(e.target.value)} type="number" className="form-control" id="exampleInputEmail1"/>
                </div> 
                
                <button type="submit" className="btn btn-primary">Crear</button>
            </form>
        </div>
    )
}


export default NewCalification
