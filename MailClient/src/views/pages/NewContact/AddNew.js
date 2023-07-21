//all contact copy;
import React, { useState,useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
// const location = useLocation();
// console.log(location.state.data._id);

// import "../App.css";
const handleSubmit = (event) => {
  event.preventDefault();
  console.log("form submitted ✅");
};
const AddNew = () => {
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: "",
  });
  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
      console.log(value)
    setContact({ ...contact, [name]: value, message: message.value });
    console.log(contact,email);
  };
  const PostData = async (e) => {
    e.preventDefault();

    // setContact({ ...contact, message: message.value });
        const { name, email, message } = contact;

    // console.log(contact);
    const res = await fetch("/api/AddCon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 422 || !data) {
      window.alert("Invalid Registration!!");
     
    } else {
      window.alert("Registration Successfull!!");
      
     
            navigate('/allcontacts');
    }
  };
  const callAboutPage =async () => {
  try{
    const res = await fetch('/about',{
      method:"GET",
      headers:{
        Accept: "application/json",
        "Content-Type" : "application/json"
      },
      credentials:"include"
      });

      const user = await res.json();
      console.log(user);
      setUserData(user._id);
 
      if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
      }

  }catch (err) {
    console.log(err);
    navigate('/login');

  }
}
  useEffect(() => {
    
    callAboutPage();
  }, []);
  return (
    <form onSubmit={handleSubmit} method="POST" className="container pt-3">
      <h3>Add New Contact</h3>
      <div className="mb-3">
        <label>Name</label>
        <input
          type="text"
          name="name"
          id="name"
          className="form-control"
          value={contact.name}
          onChange={handleInputs}
          placeholder="Enter Name"
        />
      </div>
      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          name="email"
          id="email"
          className="form-control"
          placeholder="Enter email"
          value={contact.email}
          onChange={handleInputs}
        />
      </div>
      <div className="mb-3">
        {/* <label>Message</label> */}
        <input
          type="hidden"
          className="form-control"
          placeholder="Type Your Message here!!"
          name="message"
          id="message"
          value={userData}
          // onChange={handleInputs}
        />
      </div>

      <div className="d-grid">
        <input
          type="submit"
          className="btn btn-primary"
          value="Send"
          onClick={PostData}
        />
      </div>
    </form>
  );
};

export default AddNew;
