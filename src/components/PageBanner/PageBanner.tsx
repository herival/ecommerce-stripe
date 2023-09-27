/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 21/09/2023 12:45:18
*/
import React, { FC, useEffect, Fragment } from 'react';
// import Loading from '../Loading/Loading';
import './PageBanner.css';


interface PageBannerProps {
  name: string
}


const PageBanner: FC<PageBannerProps> = ({name}) => {


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

      <div className="PageBanner">
        <div className="breadcrumb_section bg_gray page-title-mini">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="page-title">
                  <h1>{name}</h1>
                </div>
              </div>
              <div className="col-md-6">
                <ol className="breadcrumb justify-content-md-end">
                  <li className="breadcrumb-item"><a href="#">Home</a></li>
                  <li className="breadcrumb-item"><a href="#">Pages</a></li>
                  <li className="breadcrumb-item active">{name}</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>

    </Fragment>
  );
}

export default PageBanner;