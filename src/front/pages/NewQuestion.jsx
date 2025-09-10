import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const NewQuestion = () => {

    const navigate = useNavigate()

    const [text, setText] = useState('')

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    function sendData(e){
        e.preventDefault()
        console.log('send data')
        console.log(text)
        const requestOptions = {
            method: 'POST',
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(

                {
                "text": text
                }
            )
        }
        fetch(backendUrl + '/api/Questions/', requestOptions)
        .then(response => response.json())
        .then(data => 
            {console.log(data)
            navigate("/Questions")
            })
    }

    return (
        <div>
            <form className="w-50 mx-auto" onSubmit={sendData}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Text</label>
                    <input value={text} onChange={(e)=>setText(e.target.value)} type="text" className="form-control" id="exampleInputEmail1"/>
                </div>
                <button type="submit" className="btn btn-primary">Crear</button>
            </form>
        </div>
    )
}


export default NewQuestion
