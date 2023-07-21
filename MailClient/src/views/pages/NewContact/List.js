import React, { useState,useEffect }from "react";
import { useNavigate } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import $ from 'jquery'; 

import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";

const handleSubmit = (event) => {
  event.preventDefault();
  console.log("form submitted ✅");
};
const Register = () => {
  const [userData, setUserData] = useState();
  const [userList, setList] = useState();

  const navigate = useNavigate();

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
        console.log(userData);
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
    
  // const [user, setUser] = useState({
  //   listname: "",
  //   emails: "",
  //   userid: ""
  // });
 
  let name, value;
  // const handleInputs = (e) => {
  //   name = e.target.name;
  //   value = e.target.value;
  //   setUser({ ...user, [name]: value, userid: userid.value});
  // };
  const [listid, setListid] = useState({
    listname: "",
    userid: "",
    emails:""
  });
  const handle = (e) => {
    $('#emails').on('keyup',function(e){
        if(e.which === 32){
            var str = $(this).val().split('');
            if (str[str.length - 2] === ',') {
                $(this).val($(this).val().replace(' ', ''))
            };
            var val =  $(this).val($(this).val().replace(' ', ','));
  
        }  
    });
    name = e.target.name;
    value = e.target.value;
    setListid({ ...listid, [name]: value, userid: userid.value });
    console.log(listid);
  };
 
  const PostList = async (e) => {
    e.preventDefault();
    const emails = listid.emails
    const userid = listid.userid
    const listname = listid.listname
    console.log(listname);
    const res = await fetch("/api/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        listname,
        userid,
        emails
      }),
    });
    const list = await res.json();
    console.log(list);
    if (res.status === 422 || !list) {
      window.alert("Invalid List!!");
    } else {
      window.alert("List Saved Successfull!!");
      setListid({ ...listid, listname:" ", emails:"" });
      // console.log("Registration Successfull!!");
          //  useEffect();
    }
  };
  return (
    <form onSubmit={handleSubmit} method="POST">
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={9} lg={7} xl={6}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm>
                    <h1>Create List</h1>
                    <h6>List name</h6>

                    <CInputGroup className="mb-3">
                 
                      <CFormInput
                        name="listname"
                        placeholder="List Name"
                        type="text"
                        value={listid.listname} 
                        onChange={handle}
                      />
                      
                    </CInputGroup>
                   
                    <h6>Enter emails</h6>

                    <CInputGroup className="mb-3">
                      <CFormTextarea
                        value={listid.emails}
                        id = "emails"
                        onChange={handle}
                        name="emails"
                        placeholder="Enter Emails"
                        autoComplete="email"
                      />
                    </CInputGroup>
                    
                    <CInputGroup className="mb-3">
                      <CFormInput
                      type="hidden"
                        value={userData}
                      
                        name="userid"
                        id="userid"
                     
                      />
                    </CInputGroup>
                    <div className="d-grid">
                      <CButton color="primary" onClick={PostList}>
                        Create List
                      </CButton>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </form>
  );
};
// $(document).ready(function() {
  

// });

export default Register;
