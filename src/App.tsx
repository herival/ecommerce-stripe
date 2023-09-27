import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Home } from './pages/Home'
import { RequestResponse } from './models/requestResponse'
import { getDatas } from './api/entity'
import { Meta } from './models/meta'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Signin from './pages/Signin/Signin'
import Signup from './pages/Signup/Signup'
import Account from './components/Account/Account'
import PrivateRoute from './guard/PrivateRoute/PrivateRoute'
import SingleProduct from './pages/SingleProduct/SingleProduct'
import Cart from './pages/Cart/Cart'
import Checkout from './pages/Checkout/Checkout'
import NotificationComponent from './components/NotificationComponent/NotificationComponent'
import PageComponent from './pages/PageComponent/PageComponent'
import Error from './pages/Error/Error'
import WishList from './pages/WishList/WishList'
import Compare from './pages/Compare/Compare'

const App: React.FC = () => {

  const [metas, setMetas] = useState<Meta[]>([])

  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {
      const data: RequestResponse = await getDatas("meta")

      if(data.isSuccess){
        const results : Meta[] = (data.results as Meta[])
        
        setMetas(results)
      }
    }
    runLocalData()
  }, [])

  return (
    <BrowserRouter>
      
      <Header metas={metas}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/product/:slug" element={<SingleProduct />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/page/:slug" element={<PageComponent />} />
          <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute> } />
          <Route path="/error" element={<Error />} />
          <Route path="/**" element={<Error />} />
        </Routes>
      <Footer metas={metas}/>
      <NotificationComponent/>

    </BrowserRouter>
  )
}

export default App
