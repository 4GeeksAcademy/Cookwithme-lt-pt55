import React, { useEffect, useState } from "react"
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Answer = () => {

    const [answers, setAnswers] = useState([])

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    function getAnswers() {
        fetch(backendUrl + '/api/answers')
            .then(response => response.json())
            .then(data => setAnswers(data))
    }

    function deleteAnswers(answer_id) {
        const requestOptions = {
            method: 'DELETE'
        }
        fetch(backendUrl + '/api/answers/' + answer_id, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                getAnswers()
            })
    }

    useEffect(() => {
        getAnswers()
    }, [])

    return (
        <div className="text-center mt-5">
            <h1 className="display-4">Answers!!</h1>

            <div className="ml-auto">
                <Link to="/add_answer">
                    <button className="btn btn-success my-3">Crear Answer</button>
                </Link>
            </div>

            {answers.map((answer) => (
                <p key={answer.id}>
                    Text: {answer.text}

                    <Link to={"/answers/" + answer.id}>
                        <button className="btn btn-primary">Ver Answer</button>
                    </Link>

                    <Link to={"/answers/" + answer.id + "/edit"}>
                        <button className="btn btn-info">Editar Answer</button>
                    </Link>

                    <button className="btn btn-danger" onClick={() => deleteAnswers(answer.id)}>Eliminar Answer</button>
                </p>
            ))}

        </div>
    );
};
