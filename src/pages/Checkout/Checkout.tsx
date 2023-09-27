/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 26/09/2023 14:47:40
*/
import React, { FC, useEffect } from 'react';
import './Checkout.css';


interface CheckoutProps {

}


const Checkout: FC<CheckoutProps> = () => {



  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {

    }
    runLocalData()
  })

  return (
    <div className="Checkout">
      Checkout Component
    </div>
  );
}

export default Checkout;