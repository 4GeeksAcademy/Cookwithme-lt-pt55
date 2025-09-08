import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Link , useParams} from "react-router-dom";

const EditAdmin = () => {

 const { editAdmId } = useParams()

    const [editEmail, seteditEmail] = useState('')
    const [editPassword, seteditPassword] = useState('')

     const backendUrl = import.meta.env.VITE_BACKEND_URL

  
   function editAdminuser(){

       const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

const raw = JSON.stringify({
  "email": editEmail,
  "password": editPassword
});

const requestOptions = {
  method: "PUT",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch( backendUrl + editAdmId, requestOptions)
  .then((response) => response.text())
        seteditEmail('')
       seteditPassword('')
        
       }
         
  return (
    <div className="container">

      <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label">Email</label>
        <input type="text" value={editEmail} onChange={(e) =>seteditEmail(e.target.value)} className="form-control" id="exampleFormControlInput1" placeholder="Enter New Email"/>
        </div>

        <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label">Password</label>
        <input type="password" value={editPassword} onChange={(e) => seteditPassword(e.target.value)} className="form-control" id="exampleFormControlInput1" placeholder="Enter New Password"/>
        </div>

      <button className="btn btn-success" onClick={editAdminuser}> Save </button>
      <Link to="/">
        <button className="btn btn-primary">Back home</button>
      </Link>
    </div>
  );
};
   


export default EditAdmin


