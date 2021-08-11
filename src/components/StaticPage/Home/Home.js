import React, {useEffect, useState} from 'react';
import './Home.css'
import Aux from "../../../hoc/Aux/Aux";
import CustomCarousel from "../../UI/OwlCarousel/OwlCarousel";
import ReactPlayer from "react-player";
import HomeCarousel from "../../UI/HomeCarousel/HomeCarousel";
import video from '../../../assets/video/logo.mp4'
//https://thedigitalmonk.org/sgn/assets/img/logo2.mp4
const Home = ( props ) => {
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0)
        // if (localStorage.getItem('video') === 'true') {
        //    setLoader(false)
        // } else  {
        //     localStorage.setItem('video', 'true')
        //     setLoader(true)
        // }

    }, [])
    console.log(video)

    const preLoader = (
       <>
           <div className="bg_load" />
           <div className="splash__wrapper d-flex justify-content-center">
               <ReactPlayer url={video} controls={false} playing={true} volume={0} onEnded={() => setLoader(false)} />
           </div>
       </>
    )

    return (

            loader ? preLoader :
                (
                    <Aux>
                        <section className={'home-banner text-center'}>
                            <HomeCarousel />
                        </section>

                        <section className={'section2'}>
                            <div className="area">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-7">
                                            <img src="img/icon1.png" alt={'icon'}/>
                                            <h1>Delivery</h1>
                                            <p>NO NEED TO TRAVEL FAR, WE WILL BRING YOUR
                                                ORDERS RIGHT TO YOU AND WITHIN YOUR SCHEDULE.</p>
                                        </div>
                                        <div className={'sec2img'}>
                                            <img src={'img/sec2img1.png'} alt={'sec2img1'}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className={'section3'}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12 text-center">
                                        <img src={'img/icon4.png'} alt={'icon4'}/>
                                        <h2>Customer Services</h2>
                                        <p>Our customers are always 100% satisfied working with us<br/> as we offer the best deals in the market.</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="area text-center">
                                            <img src='img/icon2.png' alt="icon2"/>
                                            <p>Our customers are always 100% satisfied working with us as we offer the best deals in the market.</p>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="area text-center">
                                            <img src='img/icon2.png' alt="icon2"/>
                                            <p>We focus on quality, prices, and delivery expedition.</p>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="area text-center">
                                            <img src='img/icon2.png' alt="icon2"/>
                                            <p>We serve around the world.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="section4">
                        </section>

                        <section className="section5">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12 text-center">
                                        <img src={'img/icon3.png'} alt={'icon3'}/>
                                        <h2>Our Client</h2>
                                        <CustomCarousel/>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </Aux>
                )

    );
};

export default Home;
