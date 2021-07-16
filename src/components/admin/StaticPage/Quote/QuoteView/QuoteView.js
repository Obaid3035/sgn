import React, {useEffect, useState} from 'react';
import axios from "axios";
import Spinner from "../../../../UI/ProgressBar/ProgressBar";
import {NavLink} from "react-router-dom";

const QuoteView = (props) => {
    const id = props.match.params.id;
    const [quoteData, setQuoteData] = useState();
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        axios.get('/quote/'+ id)
            .then((res) => {
                setQuoteData(res.data)
                setLoaded(true)
            })
        console.log(quoteData)
    }, [loaded])
    return (
        loaded ?
            quoteData ? <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8 mb-5">
                            <NavLink to={'/admin/quote'} className="btn btn-warning">Back</NavLink>
                        </div>
                        {quoteData.file ?  <div className="col-md-4 mb-5">
                            <p>File:</p>
                            <a href={'https://sleepy-savannah-00668.herokuapp.com/file/'+quoteData.file.id}>{quoteData.file.name}</a>
                        </div> : ''}
                        <div className="col-md-12 job-list">
                            <div className="card">
                                <div className="card-header card-header-primary">
                                    <h4 className="card-title mb-0">Review Quotes</h4>
                                </div>
                                <div className="card-body">
                                    <form action="" className="pt-5" id="reviewApplication">
                                        <div className="form-row">
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">First Name</label>
                                                    <input type="text" className="form-control" readOnly id=""
                                                           name="firstName" value={quoteData.firstName} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">Last Name</label>
                                                    <input type="text" className="form-control" readOnly id=""
                                                           name="lastName" value={quoteData.lastName} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">Company Name</label>
                                                    <input type="text" className="form-control" readOnly id=""
                                                           name="companyName" value={quoteData.companyName} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">Company Address</label>
                                                    <input type="text" className="form-control" readOnly id=""
                                                           name="companyAddress" value={quoteData.companyAddress} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">Email</label>
                                                    <input type="text" className="form-control" id="" name="email" readOnly
                                                           value={quoteData.email}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">Phone Number</label>
                                                    <input type="tel" className="form-control" id="" name="phoneNumber"
                                                           readOnly value={quoteData.phoneNumber} />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">Best Way to Reach Out</label>
                                                    <input type="text" className="form-control" id="" name="wayToReach"
                                                           readOnly value={quoteData.bestOption} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">Best Date and Time</label>
                                                    <input type="text" className="form-control" readOnly id=""
                                                           name="dateTime" value={quoteData.timeToReach} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">Industry Of Product</label>
                                                    <input type="text" className="form-control" id="" name="ProductIndustry"
                                                           readOnly value={quoteData.industry} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">Name Of Product</label>
                                                    <input type="text" className="form-control" id="" name="productName"
                                                           readOnly value={quoteData.productName} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">Picture Of Document / Document</label>
                                                    <input type="text" className="form-control" readOnly value="abc.pdf" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">Quantity Of Product</label>
                                                    <input type="text" className="form-control" id="" name="productQuantity"
                                                           readOnly value={quoteData.quantity} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">Target Price</label>
                                                    <input type="text" className="form-control" readOnly id="" name="price"
                                                           value={quoteData.pricePerUnit} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">How soon do you want it?</label>
                                                    <input type="text" className="form-control" readOnly id=""
                                                           name="ExpectedTimeofDelivery" value={quoteData.howSoon} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">Delivery Adress would be the same as the company’s
                                                        address?</label>
                                                    <input type="text" className="form-control" readOnly id=""
                                                           name="sameDeliveryAddress" value={quoteData.checkAddress ? 'Yes' : 'No'} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">Delivery Address</label>
                                                    <input type="text" className="form-control" readOnly id=""
                                                           name="deliveryAddress" value={quoteData.Address} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">
                                                        On the scale of 1 to 10, how satisfied were you with your last interaction with our representative?</label>
                                                    <input type="text" className="form-control" readOnly id=""
                                                           name="deliveryAddress" value={quoteData.lastInteractive} />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">
                                                        On the scale of 1 to 10, how clear was our representative’s presentation?</label>
                                                    <input type="text" className="form-control" readOnly id=""
                                                           name="deliveryAddress" value={quoteData.representative} />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">
                                                        On the scale of 1 to 10, how likely would you recommend our company to friends and family?</label>
                                                    <input type="text" className="form-control" readOnly id=""
                                                           name="deliveryAddress" value={quoteData.recommend} />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">
                                                        REFERRAL CODE</label>
                                                    <input type="text" className="form-control" readOnly id=""
                                                           name="deliveryAddress" value={quoteData.code} />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">
                                                        On the scale of 1 to 10, how satisfied were you with your last interaction with our representative?</label>
                                                    <input type="text" className="form-control" readOnly id=""
                                                           name="deliveryAddress" value={quoteData.representative} />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : <h3 className={'text-center'}>No Quote Found</h3>

            : <div className={'text-center'}>
        <Spinner />
    </div>
    );
};

export default QuoteView;
