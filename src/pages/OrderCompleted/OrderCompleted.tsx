/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 28/09/2023 21:16:31
*/
import React, { FC, useEffect } from 'react';
import './OrderCompleted.css';
import PageBanner from '../../components/PageBanner/PageBanner';
import { Link } from 'react-router-dom';
import { captureOrder } from '../../api/payment';
import { CLEAR_CART } from '../../redux/actions/actionTypes';
import { useDispatch } from 'react-redux';


interface OrderCompletedProps {

}


const OrderCompleted: FC<OrderCompletedProps> = () => {

  const dispatch = useDispatch()


  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {
      const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
      );
      if(clientSecret){
        // stripe
        const datas = await captureOrder("Stripe",{payment_intent: clientSecret})
        console.log({datas});
        
      }

      dispatch({
        type: CLEAR_CART,
        payload: null
      })

    }
    runLocalData()
  })

  return (
    <div className="OrderCompleted">
      <PageBanner name="Order Completed" />
      <div className="section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="text-center order_complete">
                <i className="fas fa-check-circle"></i>
                <div className="heading_s1">
                  <h3>Your order is completed!</h3>
                </div>
                <p>Thank you for your order! Your order is being processed and will be completed within 3-6 hours. You will receive an email confirmation when your order is completed.</p>
                <Link to="/" className="btn btn-fill-out">Continue Shopping</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCompleted;