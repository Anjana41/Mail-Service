
import React, { useState, useEffect } from "react";
import "./Box.css";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Button } from "@coreui/coreui";
import CardHeader from "react-bootstrap/esm/CardHeader";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from "@coreui/react";

const Current = () => {
  const [visible, setVisible] = useState(false);
  const [User, setUser] = useState({});
  const [Plan, setPlan] = useState([]);
  const [Details, setDetails] = useState([]);
  const [Planid, setPlanID] = useState({
  });



  const navigate = useNavigate();
  const callAboutPage = async () => {
    try {
      const res = await fetch("/userplan", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const plan = await res.json();
      console.log(plan);
      console.log(plan.planDetails);
      setPlan(plan.planDetails);
      setUser(plan.userData);

      setDetails(plan.purchaseDetails);

    //   PlanData();

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    //   navigate("/login");
    }
  };
  useEffect(() => {
    callAboutPage();
  }, []);

  function DeletePlan(plan_id,plan_name){
    setVisible(!visible);
    setPlanID(plan_id);
  };

  const Delete = async (e) => {
    e.preventDefault();
    const userid = User._id;
    console.log(userid);
    const res = await fetch("/user/DeletePlan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Planid,
        userid,
      }),
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      // window.alert("Error in Delete");
    } else {
      // window.alert("Plan Deleted Successfull!!");
      setVisible(false);
      callAboutPage();
    }
  };
  function DeletePlan(plan_id,plan_name){
    setVisible(!visible);
    setPlanID(plan_id);

  };

 

  const renderCard = (card, index) => {
    return (
      <Card style={{ width: "6rem" }} key={index} className="box">
        <CardHeader>
          <h2>Plan Name: {card.plan_name}</h2>
        </CardHeader>
        <Card.Body>
          {/* <Card.Title>Plan Name: {card.plan_name}</Card.Title> */}
          <Card.Text>Plan Price: Rs.{card.price}</Card.Text>
          <Card.Text>Email Limit: {card.emails}</Card.Text>
          <Card.Text>List Limit: {card.lists}</Card.Text>
          <Card.Text>Email in List Limit: {card.listemails}</Card.Text>
          <button
            className="btn btn-primary"
            type="hidden"
            onClick={() =>
              Planedit(
                card._id,
                card.plan_name,
                card.price,
                card.emails,
                card.lists,
                card.listemails
              )
            }
          >
            Update
          </button>
          <button
            className="btn btn-danger"
            onClick={() => DeletePlan(card._id,card.plan_name)}
          >
            Cancel
          </button>
        </Card.Body>
        <CModal visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader>
            <CModalTitle>Plan Cancel</CModalTitle>
          </CModalHeader>
          <CModalBody>Are You Sure?</CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton color="danger" onClick={Delete}>Cancel</CButton>
          </CModalFooter>
        </CModal>
      </Card>
    );
  };
  const renderDetails = (card, index) => {
    return (
      <Card style={{ width: "6rem" }} key={index} className="box">
        <CardHeader>
          <h2>Email Status</h2>
        </CardHeader>
        <Card.Body>
          <Card.Text>Total Emails:  {card.email_limit}</Card.Text>
          <Card.Text>Email Used:    {card.email_used}</Card.Text>
          
         
        </Card.Body>
       
      </Card>
    );
  };

  return (
    <>
  <div className="grid">{Plan.map(renderCard)}</div>
  <div className="grid">{Details.map(renderDetails)}</div>
  </>
  );
};

export default Current;
