import React from 'react';
import './Contact.css'
import {NavLink} from "react-router-dom";

const Contact = ( props ) => {

    return (
        <>
            <section className="contact-banner-area">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <div className="header-content">
                                <h1>Contact Us</h1>
                                <p>Thank you for visiting our website, we are here to help. Contact our sales department
                                    at sales@sitchaglobalnetwork.com ,or click below to fill out the form.
                                </p>
                                <a className="custom-scroll" href="#contact-details" role="button"
                                   data-target="#contact-details">
                                    scroll
                                    <span>
							<img src="img/arrow-scroll.png" alt="scroll-arrow" className="img-fluid pt-3 pr-1" />
						</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="contact-details">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-12 text-center">
                            <NavLink to={'/questionare'}><a role="button" className="btn get-quote w-25">Fill out the form</a></NavLink>
                        </div>
                        <div className="col-md-9">
                            <div className="card div_1 p-5 text-left bg-primary">
                                <h3>Contact Us</h3>
                                <img src="img/contact-page-border-bottom.png" alt="border image"
                                     className="w-75" />
                                    <p>You may reach out to us using the contact information below.</p>
                                    <div className="d-flex align-items-center mb-5">
                                        <div>
                                            <img src="img/phone-icon.png" alt="phone icon"
                                                 className="w-75 pr-3" />
                                        </div>
                                        <div>
                                            <h6>Call Us</h6>
                                            <a href="tel:+123456789">+123456789</a>
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center mb-5">
                                        <div>
                                            <img src="img/envelope-icon.png" alt="phone icon"
                                                 className="w-75 pr-3" />
                                        </div>
                                        <div>
                                            <h6>Mail Us</h6>
                                            <a href="mailto:loremipsum@gmail.com">loremipsum@gmail.com</a>
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center">
                                        <div>
                                            <img src="img/location-mark-icon.png" alt="phone icon"
                                                 className="w-75 pr-3" />
                                        </div>
                                        <div>
                                            <h6>Address</h6>
                                            <p className="m-0">Street Lorem Ipsum, 123 rd, Berlin</p>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;
