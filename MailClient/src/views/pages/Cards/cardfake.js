import React from "react";
import styles from "./styles.css";
import { Card } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";

const Cards = () => {
  const cardInfo = [
    {
    
      title: "Project 1",
      text: "Static Website"
    },
    {
   
      title: "Project 2",
      text: "Newsletter Sign Up"
    },
    {
   
      title: "Project 3",
      text: "React App"
    },
    {
    
      title: "Project 4",
      text: "My App "
    }
  ];
  

  const renderCard = (card, index) => {
    return (
      <Card style={{ width: "1rem" }} key={index} className="box">
        <Card.Img
          variant="top"
        //   src="https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        //   src={card.image}
        />
        <Card.Body>
        {/* <CardHeader>aksjdvb</CardHeader> */}
          <Card.Title>{card.title}</Card.Title>
          <Card.Text>{card.text}</Card.Text>
          {/* <CardHeader */}
        </Card.Body>
      </Card>
    );
  };

  return <div className="grid">{cardInfo.map(renderCard)}</div>;
};

export default Cards;
