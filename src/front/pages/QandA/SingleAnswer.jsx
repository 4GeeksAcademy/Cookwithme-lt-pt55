import { Link, useParams } from "react-router-dom";  // To use link for navigation and useParams to get URL parameters
import PropTypes from "prop-types";  // To define prop types for this component



export const SingleAnswer = props => {

    
    const [answer, setAnswer] = useState([])
  
    const backendUrl = import.meta.env.VITE_BACKEND_URL
  
    function getAnswer() {
      fetch(backendUrl + "/api/answers/" + answer_id)
        .then(response => response.json())
        .then(data => setAnswer(data))
    }
  
    useEffect(() => {
      getAnswer()
    }, [])



  const { answer_id } = useParams()  

  return (
    <div className="container text-center">
      <h1 className="display-4">Answer: {answer_id}</h1>
      <h1 className="display-4">Answer Text: {answer.text}</h1>
      <h1 className="display-4">Question: {answer.question_id}</h1>
      <h1 className="display-4">Chef: {answer.chef_id}</h1>
      <hr className="my-4" />  {/* A horizontal rule for visual separation. */}

      <Link to="/amswers">
        <span className="btn btn-primary btn-lg" href="#" role="button">
          Back Answer
        </span>
      </Link>
    </div>
  );
};

// Use PropTypes to validate the props passed to this component, ensuring reliable behavior.
SingleAnswer.propTypes = {
  // Although 'match' prop is defined here, it is not used in the component.
  // Consider removing or using it as needed.
  match: PropTypes.object
};
