import React, { useState } from "react";
import { useNavigate,Link, Navigate } from "react-router-dom";
import styles from "./styles.scss";


function App() {

  return (
    <div className="wrapper">
      <Card
      
        title="Unlimited"
        description="Features for this plan"
          button =  "Buy Now"
          value ="Unlimited"
      />

      <Card
        title="Premium"
        description="Features for this plan"
        button =  "Buy Now"
        value ="Premium"

      />

      <Card
        title="Standard"
        description="Features for this plan"
        button = "Buy Now"
        value ="Standard"

      />
       <Card
        title="Free"
        description="Features for this plan"
        button = "Free"
        value ="Free"

      />
    </div>
  );
}


function Plantype(name,value) {
  
  alert(`hello, ${name} ${value}`);
  // let Free;
  // if(value=="Free"){
    // const navigate = useNavigate();
    // navigate("/dashboard");
  // }
}


function Card(props) {
  return (
    
    <div className="card">
      <div className="card__body">
        
        <h2 className="card__title">{props.title}</h2>
        {/* <img src={props.img} class="card__image" /> */}
        <p className="card__description">{props.description}</p>
      </div>
      <button className="card__btn" onClick={() => Plantype(props.value,props.button)} >{props.button}</button>
    </div>
  );
  
}
export default App;


