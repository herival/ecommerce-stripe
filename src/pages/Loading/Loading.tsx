/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 26/09/2023 17:06:32
*/
import React, { FC, Fragment } from 'react';
import './Loading.css';


interface LoadingProps {
 
}


const Loading : FC<LoadingProps> = () =>{

  return (
    <Fragment>
      <div className="Loading">
      <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
      </div>
    </Fragment>
  );
}

export default Loading;