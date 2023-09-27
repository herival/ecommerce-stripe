/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 25/09/2023 13:42:11
*/
import React, { FC, useEffect,useState } from 'react';
import './ProductItem.css';
import { Product } from '../../models/product';
import { Link } from 'react-router-dom';
import { formatPrice, generateId, reductionRate } from '../../helpers/utils';
import { useDispatch } from 'react-redux';
import { ADD_NOTIFICATION, ADD_TO_CART, ADD_TO_STORAGE } from '../../redux/actions/actionTypes';
import ModalQuickView from '../ModalQuickView/ModalQuickView';



interface ProductItemProps {
  product: Product
}


const ProductItem: FC<ProductItemProps> = ({ product }) => {


  const dispatch = useDispatch()
  const [isQuickView, setIsQuickView] = useState(false)

  useEffect(() => {
    // window.scrollTo(0, 0)
    const runLocalData = async () => {

    }
    runLocalData()
  })

  const addToCart = (event: any) => {
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

  const addToWishList = (event: any) => {
    event.preventDefault()
    dispatch({
      type: ADD_TO_STORAGE,
      key: "wishlists",
      payload: product
    })
    dispatch({
      type: ADD_NOTIFICATION,
      payload: {
        _id: generateId(),
        message: product.name + " added to wish list !",
        status: "success",
        timeout: 2000
      }
    })
  }
  const addToCompare = (event: any) => {
    event.preventDefault()
    dispatch({
      type: ADD_TO_STORAGE,
      key: "comparelists",
      payload: product
    })
    dispatch({
      type: ADD_NOTIFICATION,
      payload: {
        _id: generateId(),
        message: product.name + " added to compare list !",
        status: "success",
        timeout: 2000
      }
    })
  }

  return (
    <div className="product">
      {
        isQuickView ?
        <ModalQuickView 
        product={product}
        close={()=>setIsQuickView(false)}
        />
        :
        null
      }
      <div className="product_img">
        <Link to={"/product/" + product.slug}>
          <img
            alt="product_img1"
            src={product.imageUrls[0]} />
        </Link>
        <div className="product_action_box">
          <ul className="list_none pr_action_btn">
            <li className="add-to-cart"><a onClick={addToCart}
              href="#"><i className="icon-basket-loaded"></i> Add To Cart </a>
            </li>
            <li ><a onClick={addToCompare} href="#" className="popup-ajax"><i

                className="icon-shuffle"></i></a></li>
            <li ><a onClick={()=>setIsQuickView(!isQuickView)} className="popup-ajax"><i

                className="icon-magnifier-add"></i></a></li>
            <li >
              <a href="#" onClick={addToWishList}>
                <i className="icon-heart"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="product_info">
        <h6 className="product_title">

          <Link to={"/product/" + product.slug}>
            {product.name}
          </Link>
        </h6>
        <div className="product_price"><span
          className="price"> {formatPrice(product?.solde_price)}</span>
          <del >{formatPrice(product?.regular_price)}</del>
          <div className="on_sale"><span
          >{reductionRate(product)}% Off</span></div>
        </div>
        <div className="rating_wrap">
          <div className="rating">
            <div className="product_rate"
              style={{ width: "80%" }}></div>
          </div><span
            className="rating_num">(21)</span>
        </div>
        <div className="pr_desc">
          <p >Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Phasellus blandit massa enim.
            Nullam id varius nunc id varius nunc.</p>
        </div>
        <div className="pr_switch_wrap">
          <div className="product_color_switch"><span
            data-color="#87554B"
            className="active"></span><span
              data-color="#333333"></span><span
                data-color="#DA323F"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;