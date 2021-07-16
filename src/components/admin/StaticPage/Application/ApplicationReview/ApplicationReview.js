import React, {useEffect, useState} from 'react';
import axios from "axios";
import Input from "../../../../UI/Input/Input";
import {NavLink} from "react-router-dom";
import Spinner from "../../../../UI/ProgressBar/ProgressBar";
import {Button, Form, Modal} from "react-bootstrap";

const ApplicationReview = ( props ) => {
    const [show, setShow] = useState(false);

    const [application, setApplication] = useState();
    const [loaded, setLoaded] = useState(false);
    const [referralID, setReferralID] = useState();
    const id = props.match.params.id;
    console.log('IDDD',id)
    useEffect(() => {

        axios.get('/admin/application/' + id)
            .then((res) => {
                setLoaded(true)
                console.log(res.data);
                setApplication(res.data);
            })
    }, [])

    const hiredApplicationHandler = () => {
        setShow(!show)
    }


    const inputChangeHandler = (e) => {
        setReferralID(e.target.value)
    }

    const onSubmitHandler =(e) => {
        e.preventDefault();
        axios.put('/admin/application/hired/' + id, {referralID: referralID})
            .then((res) => {
                console.log(res);
                setShow(false)
                props.history.replace('/admin/application')
                setLoaded(false)
            })
    }

    const declineApplicationHandler = (  ) => {
        axios.put('/admin/application/decline/' + id, {})
            .then((res) => {
                console.log(res);
                setLoaded(false)
                props.history.replace('/admin/application')
            })
    }

    const form = (
        <Form className="my-5" onSubmit={onSubmitHandler}>
            <Form.Group >
                <Form.Label>ID</Form.Label>
                <Form.Control type="number" className="form-control" required placeholder="Enter ID" onChange={(e) => inputChangeHandler(e)} value={referralID} />
            </Form.Group>
            <Button type={'submit'} href="" variant={'primary'} size={'lg'}>Enter</Button>
        </Form>
    )

    const handleShow = () => setShow(!show);


    return (
        loaded ? application ?
            <>
                <Modal
                    show={show}
                    onHide={handleShow}
                    animation={false}
                    size={'md'}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Enter Referral ID</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {form}
                    </Modal.Body>
                </Modal>
                <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8 mb-5">
                            <NavLink to={'/admin/application'} className="btn btn-warning">Back</NavLink>
                        </div>
                        {application.User.resume ?  <div className="col-md-4 mb-5">
                            <p>Resume:</p>
                            <a href={'https://sleepy-savannah-00668.herokuapp.com/resume/'+application.User.resume.id}>{application.User.resume.name}</a>
                        </div> : ''}
                        <div className="col-md-12 job-list">
                            <div className="card">
                                <div className="card-header card-header-primary">
                                    <h4 className="card-title mb-0">Review Application Form</h4>
                                </div>
                                <div className="card-body">
                                    <form action="" className="pt-5" id="reviewApplication">
                                        <div className="form-row">

                                            <div className="col-lg-4 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">First Name</label>
                                                    <input type="text" className="form-control" readOnly name="firstName"
                                                           value={application.firstName}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">Middle Name</label>
                                                    <input type="text" className="form-control" readOnly name="middleName"
                                                           value={application.middleName}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">Last Name</label>
                                                    <input type="text" className="form-control" readOnly name="lastName"
                                                           value={application.lastName}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-12 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">Street Address</label>
                                                    <input type="text" className="form-control" readOnly
                                                           name="streetAddress" value={application.streetAddress}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">City, State, Zip Code</label>
                                                    <input type="text" className="form-control" readOnly name="zipCode"
                                                           value={application.zipCode} />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">Phone Number</label>
                                                    <input type="tel" className="form-control" name="phoneNumber" readOnly
                                                           value={application.phoneNumber}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">Email</label>
                                                    <input type="text" className="form-control" name="email" readOnly
                                                           value={application.User.email}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">Ever applied to / worked for SGN before?</label>
                                                    <input type="text" className="form-control" name="workedForSGN" readOnly
                                                           value={application.workedForSGN ? 'yes' : 'no'}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">Explanation</label>
                                                    <input type="text" className="form-control" readOnly
                                                           name="workedForSGNExplain" value={application.workedForSGNExplain}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">any friends, relatives, or acquaintances working for
                                                        SGN?</label>
                                                    <input type="text" className="form-control" name="haveAnyFriendsAtSGN"
                                                           readOnly value={application.haveAnyFriendsAtSGN ? 'yes': 'no'}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">Explanation</label>
                                                    <input type="text" className="form-control" readOnly
                                                           name="haveAnyFriendAtSGNName" value={application.haveAnyFriendAtSGNName}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">Are you over the age of 18?</label>
                                                    <input type="text" className="form-control" name="overAge" readOnly
                                                           value={application.overAge ? 'yes' : 'no'}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">If hired, would you be able to present your
                                                        identification card when requested?</label>
                                                    <input type="text" className="form-control" readOnly
                                                           name="presentYourIdentificationCard" value={application.presentYourIdentificationCard ? 'yes' : 'no'}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">Have you been convicted of or pleaded no contest to a
                                                        felony within the last five years?</label>
                                                    <input type="text" className="form-control" readOnly
                                                           name="pleadedFelony" value={application.pleadedFelony ? 'yes' : 'no'}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">state the nature of the crime</label>
                                                    <input type="text" className="form-control" readOnly
                                                           name="pleadedFelonyExplain" value={application.pleadedFelonyExplain} />
                                                </div>
                                            </div>
                                            <div className="col-lg-12 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">Do you speak, write or understand any foreign
                                                        languages?</label>
                                                    <input type="text" className="form-control" name="isForeignLanguage"
                                                           readOnly value={application.foreignLanguage.length > 0 ? 'yes' : 'no'} />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label htmlFor="">If yes, list which languages(s) and how fluent you
                                                        consider yourself to be:</label>
                                                    <input type="text" className="form-control" name="foreignLanguage"
                                                           readOnly value={application.foreignLanguage}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">Desired Monthly Salary $</label>
                                                    <input type="text" className="form-control" readOnly
                                                           name="desiredSalary" value={application.desiredSalary} />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">Are you applying for part-time work?</label>
                                                    <input type="text" className="form-control" readOnly name="partTimeWork"
                                                           value={application.partTimeWork ? 'yes' : 'no'} />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">Are you applying for full-time work?</label>
                                                    <input type="text" className="form-control" readOnly name="fullTimeWork"
                                                           value={application.fullTimeWork ? 'yes' : 'no'} />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">Enter your available time range</label>
                                                    <div className="form-row">
                                                        <div className="col-lg-6">
                                                            <input type="text" className="form-control" readOnly
                                                                   name="timeFrom" value={application.timeRangeAvailableFrom} />
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <input type="text" className="form-control" readOnly
                                                                   name="timeTo" value={application.timeRangeAvailableTo} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">On what date can you start working?</label>
                                                    <input type="text" className="form-control" id="start-date"
                                                           name="start-date" readOnly value={application.startWorkingDate} />
                                                </div>
                                            </div>
                                            <div className="col-lg-12 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">able to perform the job either with / without
                                                        reasonable accommodation?</label>
                                                    <input type="text" className="form-control" readOnly
                                                           name="essentialFunction" value={application.essentialFunction ? 'yes' : 'no'} />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label htmlFor="">If no, describe the functions that cannot be
                                                        performed:</label>
                                                    <input type="text" className="form-control"
                                                           name="essentialFunctionExplain" readOnly value={application.essentialFunctionExplain} />
                                                </div>
                                            </div>
                                            <h3>Education History</h3>
                                            {application.educationHistories.map((school) => (
                                                <><br/>
                                                    <div className="col-lg-6 mb-4">
                                                        <div className="form-group">
                                                            <label htmlFor="">School Name</label>
                                                            <input type="text" className="form-control" name="schoolName" readOnly
                                                                   value={school.schoolName} />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-4">
                                                        <div className="form-group">
                                                            <label htmlFor="">School Address</label>
                                                            <input type="text" className="form-control" name="schoolAddress"
                                                                   readOnly value={school.schoolAddress} />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-4">
                                                        <div className="form-group">
                                                            <label htmlFor="">School City, State, Zip</label>
                                                            <input type="text" className="form-control" name="schoolZipCode"
                                                                   readOnly value={school.schoolZipCode} />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-4">
                                                        <div className="form-group">
                                                            <label htmlFor="">Number Of Years Completed</label>
                                                            <input type="number" className="form-control" name="yearsCompleted"
                                                                   readOnly value={school.yearsCompleted} />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-4">
                                                        <div className="form-group">
                                                            <label htmlFor="">Did you graduate</label>
                                                            <input type="text" className="form-control" name="isGraduate" readOnly
                                                                   value={school.isGraduate ? 'yes' : 'no'} />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-4">
                                                        <div className="form-group">
                                                            <label htmlFor="">Degree / Diploma earned</label>
                                                            <input type="text" className="form-control" name="degree" readOnly
                                                                   value={school.degree} />
                                                        </div>
                                                    </div>
                                                </>
                                            ))}
                                            <h3>Employment History</h3>
                                            {application.employmentHistories.map((employee) => (
                                                <>
                                                    <div className="col-lg-6 mb-4 ">
                                                        <div className="form-group ">
                                                            <label htmlFor=" ">Are you currently employed?</label>
                                                            <input type="text " className="form-control "
                                                                   name="isCurrentlyEmployed " readOnly value={employee.isCurrentlyEmployed ? 'yes' : 'no'}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-4 ">
                                                        <div className="form-group ">
                                                            <label htmlFor=" ">may we contact your current employer?</label>
                                                            <input type="text " className="form-control " name="contactEmployer"
                                                                   readOnly value="yes "/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-4 ">
                                                        <div className="form-group ">
                                                            <label htmlFor=" ">Name of Employer</label>
                                                            <input type="text " className="form-control " name="employerName "
                                                                   readOnly value={employee.employerName}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-4 ">
                                                        <div className="form-group ">
                                                            <label htmlFor=" ">Telephone Number</label>
                                                            <input type="tel " className="form-control " name="telephoneName "
                                                                   readOnly value={employee.telephoneName}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-4 ">
                                                        <div className="form-group ">
                                                            <label htmlFor=" ">Business Type</label>
                                                            <input type="text " className="form-control " name="businessType"
                                                                   readOnly value={employee.businessType}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-4 ">
                                                        <div className="form-group ">
                                                            <label htmlFor=" ">Address</label>
                                                            <input type="text " className="form-control " name="address" readOnly
                                                                   value={employee.address}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 mb-4 ">
                                                        <div className="form-group ">
                                                            <label htmlFor=" ">City, State, Zip</label>
                                                            <input type="text " className="form-control " name="zipCode " readOnly
                                                                   value={employee.zipCode}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 mb-4 ">
                                                        <div className="form-group ">
                                                            <label htmlFor=" ">Length of Employment</label>
                                                            <input type="text " className="form-control " name="employmentLength" readOnly
                                                                   value={employee.employmentLength}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 mb-4 ">
                                                        <div className="form-group ">
                                                            <label htmlFor=" ">Salary/Hourly Rate of Pay</label>
                                                            <input type="text " className="form-control " name="salary " readOnly
                                                                   value={employee.salary}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-4 ">
                                                        <div className="form-group ">
                                                            <label htmlFor=" ">Position & Duties</label>
                                                            <input type="text " className="form-control " name="position " readOnly
                                                                   value={employee.position}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 ">
                                                        <div className="form-group ">
                                                            <label htmlFor=" ">Reason for Leaving</label>
                                                            <input type="text " className="form-control " name="reasonOfLeaving "
                                                                   readOnly value={employee.reasonOfLeaving}/>
                                                        </div>
                                                    </div>
                                                </>
                                            ))}


                                            <h3>References</h3>
                                            {application.references.map((reference) => (
                                                <>
                                                    <div className="col-lg-6 mb-4 ">
                                                        <div className="form-group ">
                                                            <label htmlFor=" ">First Name</label>
                                                            <input type="text " className="form-control " readOnly name=" "
                                                                   value={reference.firstName}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-4 ">
                                                        <div className="form-group ">
                                                            <label htmlFor=" ">Last Name</label>
                                                            <input type="text " className="form-control " readOnly name=" "
                                                                   value={reference.lastName}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-4 ">
                                                        <div className="form-group ">
                                                            <label htmlFor=" ">Telephone Number</label>
                                                            <input type="tel " className="form-control " name=" " readOnly
                                                                   value={reference.phoneNumber}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-4 ">
                                                        <div className="form-group ">
                                                            <label htmlFor=" ">Email Address</label>
                                                            <input type="text " className="form-control " name=" " readOnly
                                                                   value={reference.email}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 mb-4 ">
                                                        <div className="form-group ">
                                                            <label htmlFor=" ">Address</label>
                                                            <input type="text " className="form-control " readOnly name=" "
                                                                   value={reference.address}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 mb-4 ">
                                                        <div className="form-group ">
                                                            <label htmlFor=" ">City, State, Zip Code</label>
                                                            <input type="text " className="form-control " readOnly name=" "
                                                                   value={reference.city}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 mb-4 ">
                                                        <div className="form-group ">
                                                            <label htmlFor=" ">Occupation</label>
                                                            <input type="text " className="form-control " readOnly name=" "
                                                                   value={reference.occupation}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 ">
                                                        <div className="form-group ">
                                                            <label htmlFor=" ">Number of Years Acquainted</label>
                                                            <input type="text " className="form-control " readOnly name=" "
                                                                   value={reference.yearsAcquainted}/>
                                                        </div>
                                                    </div>
                                                </>
                                            ))}
                                            <h3>Certification</h3>
                                            <div className="col-lg-6 mb-4 ">
                                                <div className="form-group ">
                                                    <label htmlFor=" ">Signature</label>
                                                    <input type="text " className="form-control " readOnly name=" "
                                                           value={application.certificate}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 ">
                                                <div className="form-group ">
                                                    <label htmlFor=" ">Date</label>
                                                    <input type="text " className="form-control " readOnly name=" "
                                                           value={application.createdAt}/>
                                                </div>
                                            </div>
                                            {application.applicationStatus !== 'Active' ?
                                                application.applicationStatus !== 'Hired' ?  <div className={'col-lg-12'}>
                                                    <div className={'float-right'}>
                                                        <Button size={'lg'} className={'px-5 mx-4'} onClick={hiredApplicationHandler} variant={'success'}>Hired</Button>
                                                        {application.applicationStatus === 'Hired' || application.applicationStatus === 'underReview' ? <Button size={'lg'} className={'px-5'} onClick={declineApplicationHandler} variant={'danger'}>Reject</Button> : ''}
                                                    </div>
                                                </div> : '' : ''}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            </>
            : <h3 className={'text-center'}>No Job Found</h3> : <div className={'text-center'}><Spinner /></div>
    );
}

export default ApplicationReview;
