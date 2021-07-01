import React, {useEffect, useState} from 'react';
import './Home.css'
import HomeHeader from '../../../assets/img/career-header.jpg'
import Aux from "../../../hoc/Aux/Aux";
import { Carousel } from 'react-bootstrap'
import CustomCarousel from "../../UI/OwlCarousel/OwlCarousel";
import {NavLink} from "react-router-dom";
import PreLoader from '../../../assets/video/logo.mp4'

const Home = ( props ) => {
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0)
        setTimeout(() => {
            setLoader(false)
        }, 7000)
    }, [])

    const preLoader = (
       <>
           <div className="bg_load" />
           <div className="wrapper">
               <video autoPlay muted playsInline>
                   <source src={PreLoader} type="video/mp4" />
               </video>
           </div>
       </>
    )

    return (

            loader ? preLoader :
                (
                    <Aux>
                        <section className={'home-banner text-center'}>
                            <Carousel controls={false} indicators={false} interval={5000} pause={false} fade={false}>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={HomeHeader}
                                        alt="First slide"
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={HomeHeader}
                                        alt="First slide"
                                    />
                                </Carousel.Item>
                            </Carousel>
                            <div className="container section1__below">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h1>We Provide High Quality Products And Services At Your Fingertips For Very Low Cost.</h1>
                                        <NavLink to={'/questionare'}><a className={'btn btn-warning btn-lg quote-btn'}>Get a Quote</a></NavLink>
                                    </div>
                                </div>
                            </div>
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
