import React, {useState} from 'react';
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';

const CheckoutForm= () =>{
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);

  const handleError = (error) => {
    setLoading(false);
    setErrorMessage(error.message);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!stripe) {
      return;
    }
  
    setLoading(true);
  
    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }
  
    try {
      const res = await fetch("/api/create-intent", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 5, // assuming the amount is in dollars
        }),
      });
  
      if (!res.ok) {
        throw new Error('Failed to create PaymentIntent');
      }
  
      const { clientSecret } = await res.json();
  
      if (typeof clientSecret !== 'string') {
        throw new Error('Invalid clientSecret format');
      }
  
      const { error } = await stripe.confirmPayment({
        clientSecret,
        elements,
        confirmParams: {
          return_url: 'http://localhost:3000/',
        },
      });
  
      if (error) {
        handleError(error);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div className='px-32 mt-16 md:px-[250px]'>
        <PaymentElement />
        <button className='w-full bg-primary mt-6 p-2 text-white hover:bg-blue-700 rounded'>Submit</button>
      </div>
    </form>
  );
};

export default CheckoutForm;
