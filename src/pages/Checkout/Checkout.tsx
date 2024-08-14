/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 26/09/2023 14:47:40
*/
import React, { FC, useEffect, useState } from 'react';
import './Checkout.css';
// import PageBanner from '../../components/PageBanner/PageBanner';
import { useSelector } from 'react-redux';
import { getCarrier, getCart, getUserId } from '../../redux/selectors/selectors';
import { formatPrice } from '../../helpers/utils';
import { Carrier } from '../../models/carrier';
import { RequestResponse } from '../../models/requestResponse';
import { getDatas, searchDatas } from '../../api/entity';
import { ADD_TO_STORAGE } from '../../redux/actions/actionTypes';
import { useDispatch } from 'react-redux';
import ManageAddress from '../../components/ManageAddress/ManageAddress';
import { Address } from '../../models/address';
import PaimentModal from '../../components/PaimentModal/PaimentModal';


interface CheckoutProps {

}


const Checkout: FC<CheckoutProps> = () => {


  const cart = useSelector(getCart)
  let carrier = useSelector(getCarrier)
  const [carriers, setCarriers] = useState<Carrier[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [openPayNowModal, setOpenPayNowModal] = useState<boolean>(false)
  const dispatch = useDispatch()
  const [addresses, setAddresses] = useState<Address[]>([])
  const [billingAddress, setBillingAddress] = useState<string>("")
  const [shippingAddress, setShippingAddress] = useState<string>("")
  const userId = useSelector(getUserId)

  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {
      let data: RequestResponse = await getDatas('carrier')
      if (data.isSuccess) {
        setCarriers((data.results as Carrier[]))
        if (!carrier && data?.results![0]) {
          dispatch({
            type: ADD_TO_STORAGE,
            key: "carrier",
            unique: true,
            payload: data.results[0]
          })
        }
      }
      let query = "user=" + userId
      data = await searchDatas("address", query)
      if (data.isSuccess) {
        setAddresses((data.results as Address[]))
      }
      setLoading(false)
    }
    runLocalData()
  }, [loading])

  const handleChangeCarrier = (event: any) => {
    const carrierId = event.target.value
    if (carrierId) {
      const existing = carriers.find((carr) => carr._id === carrierId)
      if (existing) {
        dispatch({
          type: ADD_TO_STORAGE,
          key: "carrier",
          unique: true,
          payload: existing
        })
      }
    }
  }

  const handlePay = (event: any) =>{
    event.preventDefault()
    const currentAddress = {
      billingAddress: addresses.filter((a) => a._id === billingAddress)[0],
      shippingAddress: addresses.filter((a) => a._id === shippingAddress)[0]
    }

    dispatch({
      type: ADD_TO_STORAGE,
      key: "currentAddress",
      unique: true,
      payload: currentAddress
    })

    setOpenPayNowModal(true)
  }

  return (
    <div className="Checkout">
      {/* <PageBanner name="Checkout" /> */}
      {
        openPayNowModal ?
        <PaimentModal
        close= {()=>setOpenPayNowModal(false)} 
        />
        :
        null
      }
      <div className="main_content">
        <div className="section">
          <div className="container">

            <div className="row">
              <div className="col-md-6">
                <div className="border p-3 p-md-4">
                  <ManageAddress
                    updateAddresses={setAddresses}
                    checkout={true}
                  />
                  {
                    addresses.length ?
                    <>
                  <div className="heading_s1">
                    <h4>Billing Details</h4>
                    <select name="billing_address" className='form-control'
                    onChange={(e)=>setBillingAddress(e.target.value)}
                    >
                      <option value="">Select your billing address ...</option>
                      {
                        addresses.map((address: Address) => {
                          return <option value={address._id} >
                            {address.name} &nbsp;
                            {address.street} &nbsp;
                            {address.code_postal} &nbsp;
                            {address.city}  &nbsp;
                            {address.state}&nbsp;
                          </option>
                        })
                      }
                    </select>
                  </div>
                  <div className="heading_s1">
                    <h4>Shipping Details</h4>
                    <select name="shipping_address" className='form-control'
                    onChange={(e)=>setShippingAddress(e.target.value)}
                    >
                      <option value="">Select your shipping address ...</option>
                      {
                        addresses.map((address) => {
                          return <option value={address._id}>
                            {address.name} &nbsp;
                            {address.street}  &nbsp;
                            {address.code_postal} &nbsp;
                            {address.city} &nbsp;
                            {address.state}&nbsp;
                          </option>
                        })
                      }
                    </select>
                  </div>
                    </>
                    :
                    null
                  }
                  <div className="heading_s1 mb-3">
                    <h4 >Carrier</h4>
                  </div>
                  <div className="select-carrier">
                    <select name="carrier" className='form-control'
                      onChange={handleChangeCarrier}
                      value={carrier ? carrier._id : null}
                    >
                      <option disabled={true}>Select your carrier ...</option>
                      {
                        carriers.map((currentCarrier) => {
                          return <option value={currentCarrier._id}>
                            {currentCarrier.name} ({formatPrice(currentCarrier.price)})
                          </option>
                        })
                      }
                    </select>
                  </div>
                </div>

              </div>
              <div className="col-md-6">
                <div className="order_review">
                  <div className="heading_s1">
                    <h4>Your Orders</h4>
                  </div>
                  <div className="table-responsive order_table">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          cart.items.map((item) => {
                            return <tr>
                              <td>
                                <img
                                  src={item.product.imageUrls[0]}
                                  alt="product image"
                                  width={30}
                                  height={30}
                                />

                                {item.product.name}
                                <span className="product-qty">{formatPrice(item.product.solde_price)} x {item.quantity}</span>
                              </td>
                              <td>
                                {formatPrice(item.sub_total)}
                              </td>
                            </tr>
                          })
                        }


                      </tbody>
                      <tfoot>
                        <tr>
                          <th>SubTotal</th>
                          <td className="product-subtotal">
                            {formatPrice(cart.sub_total)}
                          </td>
                        </tr>
                        {
                          carrier ?
                            <tr>
                              <th>Shipping</th>
                              <td>{formatPrice(carrier?.price)}</td>
                            </tr>
                            :
                            null
                        }
                        <tr>
                          <th>Total</th>
                          <td className="product-subtotal">
                            {formatPrice(cart.sub_total + (carrier?.price || 0))}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <div className="payment_method"></div>
                  {
                    billingAddress && shippingAddress && !openPayNowModal?
                  <a href="#" className="btn btn-fill-out btn-block" 
                  onClick={handlePay}
                  >
                    Pay Now ({formatPrice(cart.sub_total + (carrier?.price || 0))})
                  </a>
                  :
                  <div>
                    Please, select your billing and shipping address.
                  </div>

                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;