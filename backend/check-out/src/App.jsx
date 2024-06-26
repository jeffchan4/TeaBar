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
  const [line_items,setLineItems]=useState([]);
  const [options,setOptions]=useState([]);

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
  
  // function to get order's ids and quantity
  useEffect(() => {
    const fetchLineItems = async () => {
      fetch(`/get-price-id`)
      .then((res)=> res.json())
      .then((data)=>{ 
        console.log('frontend' + data);
        setLineItems(data);
      });
    }
    
  
    fetchLineItems();
  }, [products]); // Added products to dependency array

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        console.log('this is');
        console.log(line_items);
        const response = await fetch("/create-checkout-session", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ line_items }),
        });
        const data = await response.json();
        return data.clientSecret;
      } catch (error) {
        console.error('Error fetching client secret:', error);
      }
    };

    if (line_items.length > 0) { // Ensure line_items is not empty
      fetchClientSecret().then((clientSecret) => {
        if (clientSecret) {
          setOptions({ clientSecret });
        }
      });
    }
  }, [line_items]); // Run when line_items changes
  

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