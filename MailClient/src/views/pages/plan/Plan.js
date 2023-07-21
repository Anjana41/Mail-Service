import React, { useState, useEffect } from "react";
import "./plan.css";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Button } from "@coreui/coreui";
import CardHeader from "react-bootstrap/esm/CardHeader";

function Plan() {
  const [Plan, setPlan] = useState([]);
  const [CurrentUser, setUser] = useState([]);

  const navigate = useNavigate();
  function Plantype(price, planid, name, emails,lists) {
    if (price == 0) {
      postplandata(price, planid, name, emails,lists);
    } else {
      const data = { state: [CurrentUser, price, planid, name, emails,lists] };
      navigate("/payment", data);
    }
  };
  const postplandata = async (price, planid, name, emails,lists) => {
    const user_id = CurrentUser;
    const res = await fetch("/freeplan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price,
        planid,
        name,
        emails,
        lists,
        user_id
      }),
    });
    const data = await res.json();
    navigate("/Free/Plan");
   
  };

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

      const user = await res.json();
      console.log(user);
      setPlan(user);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      // navigate("/login");
    }
  };
  const User = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const user = await res.json();
      console.log(user);
      setUser(user);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };
  useEffect(() => {
    callAboutPage();
    User();
  }, []);
  // return (

  //   <div className="wrapper">
  //   <div className="card">
  //     <div className="card__body">
  //     {Plan.map(plans => (
  //       <div key={plans._id} >
  //       <h2 className="card__title">{plans.plan_name}</h2>
  //       <p className="card__description">{` Price  Rs. ${plans.price}`}</p>
  //       <p className="card__description">{` Email Limit  ${plans.emails}`}</p>
  //       <p className="card__description">{` List Limit  ${plans.lists}`}</p>
  //       <p className="card__description">{` Emails Limit in List  ${plans.listemails}`}</p>
  //         <button className="card__btn" onClick={() => Plantype(plans.price, plans._id,plans.plan_name,plans.emails)} >{plans.plan_name}</button>
  //       </div>
  //     ))}
  //   </div>
  //   </div>
  //   </div>
  // );
  const renderCard = (card, index) => {
    return (
      <Card style={{ width: "6rem" }} key={index} className="box">
        <CardHeader>
          <h2>{card.plan_name}</h2>
        </CardHeader>
        <Card.Body>
          <Card.Text>Plan Price: Rs.{card.price}</Card.Text>
          <Card.Text>Email Limit: {card.emails}</Card.Text>
          <Card.Text>List Limit: {card.lists}</Card.Text>
          <Card.Text>Email in List Limit: {card.listemails}</Card.Text>
          <button
            className="btn btn-primary"
            onClick={() =>
              Plantype(card.price, card._id, card.plan_name, card.emails,card.lists)
            }
          >
            {card.plan_name}
          </button>
        </Card.Body>
      </Card>
    );
  };
  return (
    <>
      <div className="grid">{Plan.map(renderCard)}</div>
    </>
  );
}
export default Plan;
