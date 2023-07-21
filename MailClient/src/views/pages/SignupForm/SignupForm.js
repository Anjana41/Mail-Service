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
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert
} from "@coreui/react";
const SignupForm = () => {
    const [userData, setUserData] = useState();
    const [listID, setList] = useState();
    const [visible, setVisible] = useState(false);



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
      let name,value;
      const [listid, setListid] = useState({
        listname: "",
        userid: "",
        url:""
      });
      const handle = (e) => {
        name = e.target.name;
        value = e.target.value;
        setListid({ ...listid, [name]: value, userid: userid.value });
      };

      const PostList = async (e) => {
        e.preventDefault();
        console.log(listid,"lsit ksudgf")
        const userid = listid.userid
        const listname = listid.listname
        const url = listid.url
        const res = await fetch("/signupform/list/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            listname,
            userid,
            url
          }),
        });
        const list = await res.json();
        console.log("asdfgh:",list);
        // setList(list);
        // console.log("lsitid:",listID);

        if (res.status === 422 || !list) {
          window.alert("Invalid List!!");
        } else {
          // window.alert("List Saved Successfull!!");
          console.log("Registration Successfull!!");
           const data ={state:{userid,list}} ;
          console.log("data:",data);
          setVisible(true);
          setTimeout(() => {
            navigate("/SignupForm/Code",data)
          }, 3000)
         
          // navigate("/SignupForm/Code",data);
          // navigate("/SignupForm");

        
        }
      };
   

      
  return (
    <form method="POST">
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
        <CAlert color="primary" visible={visible}>
           List Saved Successfully!!
            </CAlert>
          <CRow className="justify-content-center">
            <CCol md={9} lg={7} xl={6}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm>
                    <h1>Form Builder</h1>
                    <h6>List Name</h6>
                    <CInputGroup className="mb-3">
                 
                      <CFormInput
                        name="listname"
                        type="text"
                        value={listid.listname}
                        placeholder="List Name"
                        onChange={handle}
                      />
                    </CInputGroup>
                    <h6>Send Subcribers to Another URL</h6>

                    <CInputGroup className="mb-3">
                 
                 <CFormInput
                   name="url"
                   type="text"
                   value={listid.url}
                   placeholder="type your url here"
                   onChange={handle}
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
  )
}

export default SignupForm;