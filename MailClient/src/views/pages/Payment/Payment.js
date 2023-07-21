import React, { useState } from "react";
import { useLocation,useNavigate  } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
function App() {
    const location = useLocation();
    const navigate = useNavigate();

    const[emails, setEmails] = useState(location.state)
    const [planid, setPlanid] = useState(location.state[2])
    const [price, setPrice] = useState((location.state[1]))
    const [userid, setUserid] = useState((location.state[0]._id))
    // console.log(planid,userid,price)
    
    
  const [product, setProduct] = useState({
    planid: (location.state[2]),
    price: (location.state[1]),
    userid: (location.state[0]._id),
    plan_name:(location.state[3]),
    email_limit:(location.state[4]),
    lists:(location.state[5])
  });

  const makePayment = (token) => {
    const body = {
      token,
      product,
    //   planid,
    //   price,
    //   userid
    };
    const header = {
      "COntent-Type": "application/json",
    };
    return fetch(`http://localhost:5000/checkout`, {
      method: "POST",
      headers: header,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response)
        // const data = await response.json();
        // window.alert(response);
        if (response.status === 400) {
          window.alert("You have an existing plan. Update that if you want to change the plan");
          // console.log("Invalid Credentials!!");
          navigate("/dashboard")
        } else {
          navigate("/payment/status");
        }
      })
      .catch((err) => {
        windwow.alert("Error in Payment");
        console.log(err)});
  };
  return (
    <div className="App">
      <header className="App-header">
        <StripeCheckout
        className="center"
          stripeKey="pk_test_51LKbQ9KAjzxspP2ZuD97jXjcN85fXO8SlU02c3UonZfSLieIIHmNiIjMbPP4Rrty48PQAWIlG4k7wZW6FP7IhYF100l5BGu9vB"
          token={makePayment}
          name="Buy Email Plan"
        />
      </header>
    </div>
  );
}
export default App;
