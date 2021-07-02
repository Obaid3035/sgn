import React from 'react';
import Aux from "../../../hoc/Aux/Aux";
import './About.css'
import {NavLink} from "react-router-dom";

const About = ( props ) => {
    return (
        <Aux>
            <section className="about-banner-area">
                <div className="container">
                    <div className="row">
                        <div className="col-6 text-left">
                            <div className="header-content home__banner__text">
                                <h1>About Us</h1>
                                <p>SGN is a New York-based company dedicated to providing its customers with high- quality products and services around the world at low costs. In addition to our products and services, we have partnered with large companies in the
                                    agricultural, manufacturing and service industries to offer competitive prices.
                                </p>
                        {/*        <a className="custom-scroll" href="#detail-section" role="button" data-target="#detail-section">*/}
                        {/*            scroll*/}
                        {/*            <span>*/}
						{/*	<img src="img/arrow-scroll.png" alt="scroll-arrow" className="img-fluid pt-3 pr-1" />*/}
						{/*</span>*/}
                        {/*        </a>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-circle-image">
                <img src="img/r2.png" alt="circle" className="img-fluid" />
            </section>


            <section className="detail-section" id="detail-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center pb-5 mb-5">
                            <h3>Save <span>with us today!</span></h3>
                        </div>
                    </div>
                </div>
                <section className="about-cta-section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-3 text-center">
                                <NavLink to={'/questionare'}><a className={'btn btn-warning btn-lg quote-btn'}>Get a Quote</a></NavLink>
                            </div>
                        </div>
                    </div>
                </section>
            </section>

            <section className="pt-5 mt-5 pb-1">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <div className="card">
                                <img className="card-img-top img-fluid" src="img/about-card-1.jpg" alt="Card" />
                                    <div className="card-body about-card-body">
                                        <p className="card-text">lorem ipsum</p>
                                    </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card">
                                <img className="card-img-top img-fluid" src="img/about-card-2.jpg" alt="Card" />
                                    <div className="card-body about-card-body">
                                        <p className="card-text">lorem ipsum</p>
                                    </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card">
                                <img className="card-img-top img-fluid" src="img/about-card-3.jpg" alt="Card" />
                                    <div className="card-body about-card-body">
                                        <p className="card-text">lorem ipsum</p>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Aux>
    );
};

export default About;
