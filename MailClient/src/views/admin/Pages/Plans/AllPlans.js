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
  CTableHeaderCell
} from "@coreui/react";

const AllPlans = () => {
  const [Plan, setPlan] = useState([]);
  const [visible, setVisible] = useState(false);
  const [Planid, setPlanID] = useState({
  });


  const navigate = useNavigate();
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
  function Planedit(
    planID,
    plan_name,
    plan_price,
    email_limit,
    list_limit,
    listemails_limit,
    plan_type
  ) {
    const data = {
      state: [
        planID,
        plan_name,
        plan_price,
        email_limit,
        list_limit,
        listemails_limit,
        plan_type
      ],
    };

    navigate("/admin/editplan", data);
  }
  function DeletePlan(plan_id,plan_name){
    setVisible(!visible);
    setPlanID(plan_id);

  };
  const Delete = async (e) => {
    e.preventDefault();
    const res = await fetch("/admin/DeletePlan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Planid,
      }),
    });
    const data = await res.json();
    if (res.status === 404 || !data) {
      // window.alert("Error in Delete");
    } else {
      // window.alert("Plan Deleted Successfull!!");
      setVisible(false);
      callAboutPage();
    }
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
          <Card.Text>Plan Type: {card.plan_type}</Card.Text>
          <Card.Text>Email Limit: {card.emails}</Card.Text>
          <Card.Text>List Limit: {card.lists}</Card.Text>
          <Card.Text>Email in List Limit: {card.listemails}</Card.Text>
          <button
            className="btn btn-primary"
            onClick={() =>
              Planedit(
                card._id,
                card.plan_name,
                card.price,
                card.emails,
                card.lists,
                card.listemails,
                card.plan_type
              )
            }
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => DeletePlan(card._id,card.plan_name)}
          >
            Delete
          </button>
          {/* <Card.Text type = "hidden">{card._id}</Card.Text> */}
        </Card.Body>
        {/* <CButton onClick={() => setVisible(!visible)}>Launch static backdrop modal</CButton> */}
        <CModal visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader>
            <CModalTitle>Plan Delete</CModalTitle>
          </CModalHeader>
          <CModalBody>Are You Sure?</CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton color="danger" onClick={Delete}>Delete</CButton>
          </CModalFooter>
        </CModal>
      </Card>
    );
  };

  return <div className="grid">{Plan.map(renderCard)}</div>;
};

export default AllPlans;
