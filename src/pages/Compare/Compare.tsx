/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 26/09/2023 19:19:35
*/
import React, { FC, useEffect } from 'react';
import './Compare.css';
import PageBanner from '../../components/PageBanner/PageBanner';
import { useSelector } from 'react-redux';
import { getCompareList } from '../../redux/selectors/selectors';
import { Navigate } from 'react-router-dom';
import { Product } from '../../models/product';
import { Link } from 'react-router-dom';
import { formatPrice, generateId } from '../../helpers/utils';
import { useDispatch } from 'react-redux';
import { ADD_NOTIFICATION, ADD_TO_CART, REMOVE_FROM_STORAGE } from '../../redux/actions/actionTypes';


interface CompareProps {

}


const Compare: FC<CompareProps> = () => {

const comparelists = useSelector(getCompareList)
const dispatch = useDispatch()

  useEffect(() => {
    // window.scrollTo(0, 0)
    const runLocalData = async () => {

    }
    runLocalData()
  })
  const addToCart = (event: any, product: Product) => {
    event.preventDefault()
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: product,
        quantity: 1,
        sub_total: product.solde_price
      }
    })
    dispatch({
      type: ADD_NOTIFICATION,
      payload: {
        _id: generateId(),
        message: product.name + " added to cart !",
        status: "success",
        timeout: 2000
      }
    })
  }
  const removeFromCompareList = (event: any, product: Product) => {
    event.preventDefault()
    dispatch({
      type: REMOVE_FROM_STORAGE,
      key: "comparelists",
      payload: product
    })
    dispatch({
      type: ADD_NOTIFICATION,
      payload: {
        _id: generateId(),
        message: product.name + " removed from wish list !",
        status: "danger",
        timeout: 2000
      }
    })
  }

  if(!comparelists?.length){
    return <Navigate to="/" />
  }

  return (
    <div className="Compare">
      <PageBanner name='Compare Product' />
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="compare_box">
                <div className="table-responsive">
                  <table className="table table-bordered text-center">
                    <tbody>
                      <tr className="pr_image">
                        <td className="row_title">Product Image</td>
                        {
                          comparelists.map((product: Product)=>{
                            return <td className="row_img">
                            <img src={product.imageUrls[0]} alt="compare-img" />
                            </td>
                          })
                        }
                        
                        
                      </tr>
                      <tr className="pr_title">
                        <td className="row_title">Product Name</td>
                        {
                          comparelists.map((product: Product)=>{
                            return  <td className="product_name">
                              <Link to={"/product"+product.slug}>{product.name}</Link>
                              </td>
                          })
                        }
                       
                      </tr>
                      <tr className="pr_price">
                        <td className="row_title">Price</td>
                        {
                          comparelists.map((product: Product)=>{
                            return  <td className="product_price">
                              <span className="price">{formatPrice(product.solde_price)}</span>
                              </td>
                          })
                        }
                       
                      </tr>
                     
                      <tr className="pr_add_to_cart">
                        <td className="row_title">Add To Cart</td>
                        {
                          comparelists.map((product: Product)=>{
                            return  <td className="row_btn">
                              <a href="#" onClick={(event)=>addToCart(event, product)} className="btn btn-fill-out">
                                <i className="icon-basket-loaded"></i> Add To Cart</a>
                                </td>
                          })
                        }
                        
                      </tr>
                      <tr className="description">
                        <td className="row_title">Description</td>
                        {
                          comparelists.map((product: Product)=>{
                            return  <td className="row_text">
                              <p>{product.description}</p>
                              </td>
                          })
                        }
                        
                      </tr>

                      <tr className="pr_remove">
                        <td className="row_title"></td>
                        {
                          comparelists.map((product: Product)=>{
                            return  <td className="row_remove">
                          <a href="#"  onClick={(event)=>removeFromCompareList(event, product)}><span>Remove</span> <i className="fa fa-times"></i></a>
                        </td>
                          })
                        }
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Compare;