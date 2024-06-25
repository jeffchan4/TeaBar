import React, { useCallback, useState, useEffect } from "react";
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
 
} from "react-router-dom";
import CompleteCheckout from './CompleteCheckout';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// This is your test secret API key.
const stripePromise = loadStripe("pk_test_51PQjG6AFqUQd4Eny97EEltNnbulvb17KkCYaYCRrzzLHStHRXHI5KQ1c8L3cRjPVpEWO3r6TVDtK3NamOTBLxlge0046VhD04L");

const CheckoutForm = () => {
  const [products,setProducts]=useState([]);
  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch("/create-checkout-session", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  useEffect(()=>{
    // Function to call the Express server
    const fetchProducts = async ()=> {
    fetch(`/list-all-products`)
    .then((res)=> res.json())
    .then((data)=>{
      
      console.log(data)
      setProducts(data)
    });
  }
    fetchProducts(); 
  },[]);
  
  //function to get order's ids and quantity
  // useEffect(() => {
  //   const fetchLineItems = async () => {
  //     if (products) {
  //       try {
  //         const response = await fetch('http://localhost:4242/get-price-id', {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify(products), // convert hashmap to JSON string
  //         });
      
  //         const data = await response.json();
  //         console.log(data); // Handle the response data
  //       } catch (error) {
  //         console.error('Error:', error);
  //       }
      
  //     }
  //   };
  
  //   fetchLineItems();
  // }, [products]); // Added products to dependency array

  const options = {fetchClientSecret};

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}

const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

    fetch(`/session-status?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
      });
  }, []);

  if (status === 'open') {
    return <Navigate to="/checkout" />;
  }

  if (status === 'complete') {
    return <Navigate to="/complete_checkout" />;
  }
  return null; //replace this with our returning home url
}

const App = () => {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/checkout" element={<CheckoutForm />} />
          <Route path="/return" element={<Return />} />
          <Route path="/complete_checkout" element={<CompleteCheckout/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;