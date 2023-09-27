/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 21/09/2023 08:36:07
*/
import React, { FC, useEffect, useState } from 'react';
// import Loading from '../Loading/Loading';
import './Banner.css';
import { getDatasByPage } from '../../api/entity';
import { RequestResponse } from '../../models/requestResponse';
import { Slider } from '../../models/slider';


interface BannerProps {

}


const Banner: FC<BannerProps> = () => {


  // const [state, setState] = useState<any>({})
  const [sliders, setSliders] = useState<Slider[]>([])
  // const [loading, setLoading] = useState(true);
  // const [value, setValue] = useState('');

  

  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {
      const data: RequestResponse = await getDatasByPage("slide",1,3)

      if(data.isSuccess){
        const results : Slider[] = (data.results as Slider[])
        setSliders(results)
      }
    }
    runLocalData()
  }, [])

  return (
    <div className="banner_section slide_medium shop_banner_slider staggered-animation-wrap">
      <div id="carouselExampleControls" data-bs-ride="carousel"
        className="carousel slide carousel-fade light_arrow">
        <div className="carousel-inner">
          {
            sliders.length ?
            sliders.map((slide, index)=>{
              return  <div 
              className={index === 0 ? "carousel-item active background_bg" : "carousel-item background_bg"} 
              key={index}
              data-img-src={ slide.imageUrl }
              style={{ backgroundImage: `url(${slide.imageUrl })` }}>
              <div className="banner_slide_content">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-7 col-9">
                      <div className="banner_content overflow-hidden">
                        <h5 data-animation="slideInLeft"
                          data-animation-delay="0.5s"
                          className="mb-3 staggered-animation font-weight-light animated slideInLeft"
                          style={{ animationDelay: '0.5s', opacity: 1 }}>{slide.description}</h5>
                        <h2 data-animation="slideInLeft"
                          data-animation-delay="1s" className="staggered-animation animated slideInLeft"
                          style={{ animationDelay: '0.5s', opacity: 1 }}>{slide.title}</h2>
                          <a
                            data-animation="slideInLeft"
                            data-animation-delay="1.5s"
                            className="btn btn-fill-out rounded-0 staggered-animation text-uppercase animated slideInLeft"
                            href={slide.button_link}
                            target='_blank'
                            style={{ animationDelay: '1.5s', opacity: 1 }}>
                              {slide.button_text}
                              </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            })
            :
            null
          }
         
          {/* <div className="carousel-item background_bg"
            data-img-src="/assets/files/17099405955142852076105633054671075224313121684753428765.png"
            style={{ backgroundImage: 'url(&quot;/assets/files/17099405955142852076105633054671075224313121684753428765.png&quot;)' }}>
            <div className="banner_slide_content">
              <div className="container">
                <div className="row">
                  <div className="col-lg-7 col-9">
                    <div className="banner_content overflow-hidden">
                      <h5 data-animation="slideInLeft"
                        data-animation-delay="0.5s"
                        className="mb-3 staggered-animation font-weight-light animated slideInLeft"
                        style={{ animationDelay: '0.5s', opacity: 1 }}>Get up to 50% off Today Only!
                      </h5>
                      <h2 data-animation="slideInLeft"
                        data-animation-delay="1s" className="staggered-animation animated slideInLeft"
                        style={{ animationDelay: '0.5s', opacity: 1 }}>Woman Fashion</h2><a
                          data-animation="slideInLeft"
                          data-animation-delay="1.5s"
                          className="btn btn-fill-out rounded-0 staggered-animation text-uppercase animated slideInLeft"
                          href="http://localhost:4300/"
                          style={{ animationDelay: '1.5s', opacity: 1 }}>Shop Now</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item background_bg"
            data-img-src="/assets/files/2850766279112079091504712247552853779750349121684753505113.png"
            style={{ backgroundImage: 'url(&quot;/assets/files/2850766279112079091504712247552853779750349121684753505113.png&quot;)' }}>
            <div className="banner_slide_content">
              <div className="container">
                <div className="row">
                  <div className="col-lg-7 col-9">
                    <div className="banner_content overflow-hidden">
                      <h5 data-animation="slideInLeft"
                        data-animation-delay="0.5s"
                        className="mb-3 staggered-animation font-weight-light animated slideInLeft"
                        style={{ animationDelay: '0.5s', opacity: 1 }}>Taking your Viewing Experience to
                        Next Level</h5>
                      <h2 data-animation="slideInLeft"
                        data-animation-delay="1s" className="staggered-animation animated slideInLeft"
                        style={{ animationDelay: '0.5s', opacity: 1 }}>Summer Sale</h2><a
                          data-animation="slideInLeft"
                          data-animation-delay="1.5s"
                          className="btn btn-fill-out rounded-0 staggered-animation text-uppercase animated slideInLeft"
                          href="http://localhost:4300/"
                          style={{ animationDelay: '1.5s', opacity: 1 }}>Shop Now</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item background_bg"
            data-img-src="/assets/files/80746066632713998236489572054461980464175761684755285905.png"
            style={{ backgroundImage: 'url(&quot;/assets/files/80746066632713998236489572054461980464175761684755285905.png&quot;)' }}>
            <div className="banner_slide_content">
              <div className="container">
                <div className="row">
                  <div className="col-lg-7 col-9">
                    <div className="banner_content overflow-hidden">
                      <h5 data-animation="slideInLeft"
                        data-animation-delay="0.5s"
                        className="mb-3 staggered-animation font-weight-light animated slideInLeft"
                        style={{ animationDelay: '0.5s', opacity: 1 }}>Taking your Viewing Experience to
                        Next Level</h5>
                      <h2 data-animation="slideInLeft"
                        data-animation-delay="1s" className="staggered-animation animated slideInLeft"
                        style={{ animationDelay: '0.5s', opacity: 1 }}>Summer Sale</h2><a
                          data-animation="slideInLeft"
                          data-animation-delay="1.5s"
                          className="btn btn-fill-out rounded-0 staggered-animation text-uppercase animated slideInLeft"
                          href="http://localhost:4300/"
                          style={{ animationDelay: '1.5s', opacity: 1 }}>Shop Now</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div><a href="#carouselExampleControls" role="button" data-bs-slide="prev"
          className="carousel-control-prev"><i className="ion-chevron-left"></i></a><a
            href="#carouselExampleControls" role="button" data-bs-slide="next"
            className="carousel-control-next"><i className="ion-chevron-right"></i></a>
      </div>
    </div>
  );
}

export default Banner;