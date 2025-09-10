import { Link, useParams } from "react-router-dom";  // To use link for navigation and useParams to get URL parameters
import PropTypes from "prop-types";  // To define prop types for this component



export const SingleQuestion = props => {

    
  const { question_id } = useParams()


  return (
    <div className="container text-center">
      <h1 className="display-4">Question: {question_id}</h1>
      <hr className="my-4" />  {/* A horizontal rule for visual separation. */}

      <Link to="/questions">
        <span className="btn btn-primary btn-lg" href="#" role="button">
          Back Question
        </span>
      </Link>
    </div>
  );
};

// Use PropTypes to validate the props passed to this component, ensuring reliable behavior.
SingleQuestion.propTypes = {
  // Although 'match' prop is defined here, it is not used in the component.
  // Consider removing or using it as needed.
  match: PropTypes.object
};
