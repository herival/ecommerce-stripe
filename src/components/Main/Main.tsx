/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 21/09/2023 08:14:05
*/
import React, { FC, useEffect, Fragment } from 'react';
// import Loading from '../Loading/Loading';
import './Main.css';
import Banner from '../Banner/Banner';
import Collection from '../Collection/Collection';
import Exclusive from '../Exclusive/Exclusive';


interface MainProps {

}


const Main: FC<MainProps> = () => {


  // const [state, setState] = useState<any>(null)
  // const [loading, setLoading] = useState(true);
  // const [value, setValue] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {

      // setLoading(false)
    }
    runLocalData()
  }, [])

  return (
    <Fragment>

      <div className="Main">
        <Banner/>
        <div className="main_content">
          <Collection/>
         <Exclusive/>
        </div>
      </div>

    </Fragment>
  );
}

export default Main;