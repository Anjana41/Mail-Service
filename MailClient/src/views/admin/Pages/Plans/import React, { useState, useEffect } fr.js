import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardGroup,
    CCardHeader,
    CCardImage,
    CCardLink,
    CCardSubtitle,
    CCardText,
    CCardTitle,
    CListGroup,
    CListGroupItem,
    CNav,
    CNavItem,
    CNavLink,
    CCol,
    CRow,
  } from '@coreui/react'
import styles from "./plans.css";

const AllUsers = () => {
    const [Plan, setPlan] = useState([]);
    const callAboutPage = async () => {
        try {
          const res = await fetch("/plandata", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
    
          const plan = await res.json();
          console.log(plan);
          setPlan(plan);
    
          if (!res.status === 200) {
            const error = new Error(res.error);
            throw error;
          }
        } catch (err) {
          console.log(err);
          // navigate("/login");
        }
      };
      useEffect(() => {
        callAboutPage();
      }, []);
    

// function Card(props) {
  return (
    // <div className="wrapper">
<CCard >
  <CCardBody>
  {Plan.map(plans => (
        <div key={plans._id} >
    {/* <CCardTitle>{plans.plan_name}</CCardTitle> */}
    <h2 className="card__title">{plans.plan_name}</h2>
     <p className="card__description">{` Price  Rs. : ${plans.price}`}</p>
    <p className="card__description">{` Email Limit: ${plans.emails}`}</p>
    <p className="card__description">{` List Limit:  ${plans.lists}`}</p>
     <p className="card__description">{` Emails Limit in List: ${plans.listemails}`}</p>
    <CButton onClick={() => Planedit(plans.price, plans._id,plans.plan_name,plans.emails)} >Edit Plan</CButton>
    </div>
  ))}
  </CCardBody>
</CCard>
// </div>
  );
}

export default AllUsers;
