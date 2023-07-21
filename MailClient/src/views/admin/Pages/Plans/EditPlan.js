import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
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
  CCardGroup,
} from "@coreui/react";


const Editplan = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [Plan, setPlan] = useState({
    plan_id:location.state[0],
    plan_name:location.state[1],
    price:location.state[2],
    emails:location.state[3],
    lists:location.state[4],
    listemails:location.state[5],
    plan_type:location.state[6],
  });
let name,value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    console.log(value);
    setPlan({ ...Plan, [name]: value});
  }

    const handleUpdate = async (e) => {
    e.preventDefault();
    const { plan_id,plan_name,price, emails,lists,listemails,plan_type } = Plan;
    const res = await fetch("/admin/UpdatePlan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        plan_name,
        plan_type,
        price,
        emails,
        lists,
        listemails,
        plan_id
      }),
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      window.alert("Error in Update");
     
    } else {
      window.alert("Plan Updated Successfull!!");
      navigate('/admin/allplans');
    }
  };
      
     
  return (
    <form method="POST">
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={6} lg={7} xl={5}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm>
                    <h1>Add Plan</h1>
                    <h6>Plan Name</h6>
                    <CInputGroup className="mb-3">
                      <CFormInput
                        name="plan_name"
                        type="text"
                        value={Plan.plan_name}
                        onChange={handleChange}
                        />
                    </CInputGroup>
                    <h6>Plan Type</h6>
                    <CInputGroup className="mb-3">
                      <CFormInput
                        name="plan_type"
                        type="text"
                        value={Plan.plan_type}
                        onChange={handleChange}
                        />
                    </CInputGroup>
                    <h6>Plan Price</h6>
                    <CInputGroup className="mb-3">
                      <CFormInput
                        name="price"
                        value={Plan.price}
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    <h6>Email Limit</h6>
                    <CInputGroup className="mb-3">
                      <CFormInput
                        name="emails"
                        value={Plan.emails}
                        onChange={handleChange} 
                      />
                    </CInputGroup>
                    <h6>List Limit</h6>
                    <CInputGroup className="mb-3">
                      <CFormInput
                       name="lists"
                       value={Plan.lists}
                       onChange={handleChange}
                      />
                    </CInputGroup>
                    <h6>Email Limit in List</h6>
                    <CInputGroup className="mb-3">
                      <CFormInput
                        name="listemails"
                        value={Plan.listemails}
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    <div className="d-grid">  
                      <CButton color="primary" onClick={handleUpdate}>Update Plan</CButton>
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

export default Editplan;
