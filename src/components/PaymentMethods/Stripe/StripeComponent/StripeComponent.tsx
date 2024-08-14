/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 28/09/2023 17:42:28
*/
import React, { FC, useEffect, useState } from 'react';
import './StripeComponent.css';
// import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from '../../../../api/payment';
import { useSelector } from 'react-redux';
import { getCarrier, getCart, getCurrentAddress, getUserId } from '../../../../redux/selectors/selectors';
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckoutForm from '../StripeCheckoutForm/StripeCheckoutForm';
import Loading from '../../../../pages/Loading/Loading';


interface StripeComponentProps {
 
}


const StripeComponent : FC<StripeComponentProps> = () =>{


    // const [publicApiKey, setPublicApiKey] = useState<string>("");
    const [clientSecret, setClientSecret] = useState<string>("");
    const [stripePromise , setStripePromise ] = useState<any>();
    const cart = useSelector(getCart)
    const userId = useSelector(getUserId)
    const carrier = useSelector(getCarrier)
    const currentAddress = useSelector(getCurrentAddress)

    useEffect(() => {
      window.scrollTo(0,0)
      const runLocalData = async () => {
        const data = {
          cart,
          carrier,
          userId,
          ...currentAddress
        }
        const paymentIntent = await createPaymentIntent("Stripe", data)

        setClientSecret(paymentIntent?.clientSecret)

        if(process.env.NODE_ENV === "development"){
          // setPublicApiKey(paymentIntent?.TEST_PUBLIC_API_KEY)
          setStripePromise(loadStripe(paymentIntent?.TEST_PUBLIC_API_KEY))
        }else if(process.env.NODE_ENV === "production"){
          // setPublicApiKey(paymentIntent?.PROD_PUBLIC_API_KEY)
          setStripePromise(loadStripe(paymentIntent?.PROD_PUBLIC_API_KEY))
        }
        
      }
      runLocalData()
    },[cart])
  
    const appearance = {
      theme: 'stripe',
    };
    const options: any = {
      clientSecret,
      appearance,
    };
  
    return (
      <div className="App">
        {clientSecret && stripePromise ?

          <Elements options={options} stripe={stripePromise}>
            <StripeCheckoutForm />
          </Elements>
        :
        <Loading/>  
      }
      </div>
    );
}

export default StripeComponent;