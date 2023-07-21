
// import "./App.css";

import { useState } from "react";

import StripeCheckout from "react-stripe-checkout";

import axios from "axios";

// import { toast } from "react-toastify";

// import "react-toastify/dist/ReactToastify.css";

function App() {

//   toast.configure()

  const [product] = useState({
    name: "Sample Book",
    price: 120,
    description: "This is a sample book",
  });

  async function handleToken(token, addresses) {
    const response = await axios.post(
      "http://localhost:5000/checkout",
      { token, product },
      console.log(token)
    );

    console.log(response.status)

    if (response.status === 200) {
      window.alert("Success! Check email for details", { type: "success" });
    } else {
      window.alert("Something went wrong", { type: "error" });
    }
  }

  return (
    <div className="App">
      <div className="container">
        <br />
        <br />
        <h1 className="text-center">Stripe Checkout</h1>
        <br />
        <h2 className="text-center">Product Info</h2>
        <h3 className="text-center">Product Name: {product.name}</h3>
        <h3 className="text-center">Product Price: {product.price}</h3>
        <h3 className="text-center">
          Product Description: {product.description}
        </h3>
        <br />
        <div className="form-group container">
          <StripeCheckout
            className="center"
            stripeKey="pk_test_51KKKyjGiLy9LOphGlp9SLf7aoVBHaTlzouy6T13cskE0B2sRHqOy8QKkUkcJEvaqk3Tb6iNIX3daIA5YWaqj4sxU00sXdrGAYb"
            token={handleToken}
            amount={product.price * 100}
            name="Sample Book"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
