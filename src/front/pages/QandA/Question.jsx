import React, { useEffect, useState } from "react"
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Question = () => {


    const[questions, setQuestions] = useState([])

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    function getQuestions(){
        fetch(backendUrl + '/api/questions')
        .then(response => response.json())
        .then(data => setQuestions(data))

    }    


    function deleteQuestions(question_id){

        const requestOptions = {
            method: 'DELETE'
        }
        fetch(backendUrl + '/api/questions/' + question_id, requestOptions)
        .then(response => response.json())
        .then(data => 
            {console.log(data)
            getQuestions()})

    }    


    useEffect(() => {
        getQuestions()

    }, [])

    return (
        <div className="text-center mt-5">
            <h1 className="display-4">Questions!!</h1>

                <div className="ml-auto">
                    <Link to="/add_question">
                        <button className="btn btn-success my-3">Crear Question</button>
                    </Link>
                </div>

           { questions.map((question) => (
                <p key={question.id}> 
                    Text: {question.text}

                    <Link to={"/questions/"+question.id}>
                        <button className="btn btn-primary">Ver Question</button>
                    </Link>

                    <Link to={"/questions/" + question.id + "/edit"}>
                        <button className="btn btn-info">Editar Question</button>
                    </Link>

                        <button className="btn btn-danger" onClick={()=>deleteQuestions(question.id)}>Eliminar Question</button>
                                  
                </p>
            ))}
            
        </div>
    );
}; 