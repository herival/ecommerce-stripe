/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 26/09/2023 14:47:40
*/
import React, { FC, useEffect, useState } from 'react';
import './Cart.css';
import PageBanner from '../../components/PageBanner/PageBanner';
import { getCarrier, getCart } from '../../redux/selectors/selectors';
import { useSelector } from 'react-redux';
import { formatPrice } from '../../helpers/utils';
import { Article } from '../../models/article';
import { ADD_TO_CART, REMOVE_FROM_CART, ADD_TO_STORAGE } from '../../redux/actions/actionTypes';
import { useDispatch } from 'react-redux';
import { RequestResponse } from '../../models/requestResponse';
import { getDatas } from '../../api/entity';
import { Carrier } from '../../models/carrier';


interface CartProps {

}


const Cart: FC<CartProps> = () => {

  const dispatch = useDispatch()
  const cart = useSelector(getCart)
  const carrier = useSelector(getCarrier)
  const [carriers, setCarriers] = useState<Carrier[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    // window.scrollTo(0, 0)
    const runLocalData = async () => {
      const data: RequestResponse = await getDatas('carrier')
      if(data.isSuccess){
        setCarriers((data.results as Carrier[]))
        setLoading(false)
      }
    }
    runLocalData()
  }, [loading])

  const handleRemoveCartItem = (event: any, item: Article, quantity?: number) => {
    event.preventDefault()

    dispatch({
      type: REMOVE_FROM_CART,
      payload: {
        product: item.product,
        quantity: quantity || item.quantity
      }
    })
  }

  const handleAddItemToCart = (event: any, item: Article, quantity?: number) => {
    event.preventDefault()

    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: item.product,
        quantity: quantity || 1
      }
    })
  }

  const handleChangeCarrier = (event: any) =>{
    const carrierId = event.target.value
    if(carrierId){
      const existing = carriers.find((carr)=> carr._id === carrierId)
      if(existing){
        dispatch({
          type: ADD_TO_STORAGE,
          key: "carrier",
          unique: true,
          payload: existing
        })
      }
    }
  }

  return (
    <div className="Cart">
      <PageBanner name='Shopping Cart' />
      <div className="main_content">
        <div className="section">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="table-responsive shop_cart_table">
                  <table className="table">
                    <thead >
                      <tr >
                        <th className="product-thumbnail">&nbsp;</th>
                        <th className="product-name">Product</th>
                        <th className="product-price">Price</th>
                        <th className="product-quantity">Quantity</th>
                        <th className="product-subtotal">Total</th>
                        <th className="product-remove">Remove</th>
                      </tr>
                    </thead>
                    <tbody >
                      {
                        cart.items.map((item) => {
                          return <tr >
                            <td className="product-thumbnail"><a
                            ><img width="50"
                              alt="product1"
                              src={item.product.imageUrls[0]} /></a>
                            </td>
                            <td data-title="Product" className="product-name">
                              <a>{item.product.name}</a></td>
                            <td data-title="Price" className="product-price">{formatPrice(item.product.solde_price)}</td>
                            <td data-title="Quantity" className="product-quantity">
                              <div className="quantity">
                                <input
                                  type="button" value="-"
                                  onClick={(event) => handleRemoveCartItem(event, item, 1)}
                                  className="minus" />
                                <input type="text" value={item.quantity} name="quantity" title="Qty" size={4} className="qty" />
                                <input
                                  onClick={(event) => handleAddItemToCart(event, item, 1)}
                                  type="button" value="+" className="plus" /></div>
                            </td>
                            <td data-title="Total" className="product-subtotal">
                              {formatPrice(item.sub_total)}
                            </td>
                            <td data-title="Remove" className="product-remove">
                              <a href="#"
                                onClick={(event) => handleRemoveCartItem(event, item)}
                              ><i className="ti-close"></i></a>
                            </td>
                          </tr>
                        })
                      }


                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="medium_divider"></div>
                <div className="divider center_icon"><i
                  className="ti-shopping-cart-full"></i></div>
                <div className="medium_divider"></div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="border p-3 p-md-4">
                  <div className="heading_s1 mb-3">
                    <h6 >Carrier</h6>
                  </div>
                  <div className="select-carrier">
                    <select name="carrier" className='form-control'
                    onChange={handleChangeCarrier}
                    value={carrier._id}
                    >
                      <option disabled={true}>Select your carrier ...</option>
                      {
                        carriers.map((currentCarrier)=>{
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
                <div className="border p-3 p-md-4">
                  <div className="heading_s1 mb-3">
                    <h6 >Cart Totals</h6>
                  </div>
                  <div className="table-responsive">
                    <table className="table">
                      <tbody >
                        <tr >
                          <td className="cart_total_label">Cart Subtotal</td>
                          <td className="cart_total_amount">{formatPrice(cart.sub_total)}</td>
                        </tr>
                        <tr >
                          <td className="cart_total_label">Shipping ({carrier.name})</td>
                          <td className="cart_total_amount">{formatPrice(carrier.price)}</td>
                        </tr>
                        <tr >
                          <td className="cart_total_label">Total</td>
                          <td className="cart_total_amount"><strong
                          >{formatPrice(cart.sub_total + carrier.price)}</strong></td>
                        </tr>
                      </tbody>
                    </table>
                  </div><a className="btn btn-fill-out" href="/checkout">Proceed To CheckOut</a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div >
  );
}

export default Cart;