/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 25/09/2023 12:51:05
*/
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getAuthState } from '../../redux/selectors/selectors';

const PrivateRoute = ({ children }: any) => {

  const isAuth = useSelector(getAuthState)
  

  return isAuth ? children : <Navigate replace to="/signin" />
  
}

export default PrivateRoute;


