import React, {useEffect, useState} from "react";
import axios from "axios";
import ApplicationTable from "./ApplicationTable/ApplicationTable";
import {toast, ToastContainer} from "react-toastify";
import Spinner from "../../../UI/ProgressBar/ProgressBar";
import {Button, Form, Modal} from "react-bootstrap";

const Application = () => {
    const [loaded, setLoaded] = useState(false)
    const [show, setShow] = useState(false);
    const [underReviewApplication, setUnderReviewApplication] = useState([])
    const [declinedApplication, setDeclinedApplication] = useState([])
    const [hiredApplication, setHiredApplication] = useState([])
    const [allApplication, setAllApplication] = useState([]);
    const [userId, setUserId] = useState();
    const [referralID, setReferralID] = useState();


    useEffect(() => {
        axios.get('/admin/applications')
            .then((res) => {
                setUnderReviewApplication(res.data.applicationForm)
                setDeclinedApplication(res.data.declinedApplicant)
                setHiredApplication(res.data.hiredApplicant);
                setAllApplication(res.data.allApplicant)
                setLoaded(true)
            })
    },[loaded])


    const Notify = () => toast.success('Application Updated Successfully', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });


    const hiredApplicationHandler = (id) => {
        setUserId(id);
        setShow(!show)
    }

    const declineApplicationHandler = ( id ) => {
        axios.put('/admin/application/decline/' + id, {})
            .then((res) => {
                console.log(res);
                setLoaded(false)
                Notify();
            })
    }

    const activeApplicationHandler = ( id ) => {
        axios.put('/admin/application/active/' + id, {})
            .then((res) => {
                console.log(res);
                setLoaded(false)
                Notify();
            })
    }

    const handleShow = () => setShow(!show);
    const onSubmitHandler =(e) => {
        e.preventDefault();
        axios.put('/admin/application/hired/' + userId, {referralID: referralID})
            .then((res) => {
                console.log(res);
                setShow(false)
                setLoaded(false)
                Notify();
            })
    }
    const inputChangeHandler = (e) => {
        console.log(e.target.value)
        setReferralID(e.target.value)
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


    return (
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
               <ToastContainer
                   position="top-center"
                   autoClose={2000}
                   hideProgressBar={false}
                   newestOnTop={false}
                   closeOnClick
                   rtl={false}
                   pauseOnFocusLoss={false}
                   draggable
                   pauseOnHover
               />
               <div className="container-fluid">
                   <div className="row">
                       <div className="col-md-12 job-list">
                           <div className="card">
                               <div className="card-header card-header-primary">
                                   <h4 className="card-title mb-0">Applications List</h4>
                               </div>
                               <div className="card-body">
                                   <div className="project-section">
                                       <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                           <li className="nav-item" role="presentation">
                                               <a className="nav-link btn btn-sm btn-outline btn-outline-primary active mr-2"
                                                  id="all-tab" data-toggle="pill" href="#all" role="tab"
                                                  aria-controls="all" aria-selected="false">All</a>
                                           </li>
                                           <li className="nav-item" role="presentation">
                                               <a className="nav-link btn btn-sm btn-outline btn-outline-warning mr-2"
                                                  id="review-tab" data-toggle="pill" href="#review" role="tab"
                                                  aria-controls="review" aria-selected="false">Under Review</a>
                                           </li>
                                           <li className="nav-item" role="presentation">
                                               <a className="nav-link btn btn-sm btn-outline btn-outline-success mr-2"
                                                  id="hired-tab" data-toggle="pill" href="#hired" role="tab"
                                                  aria-controls="hired" aria-selected="false">Hired</a>
                                           </li>
                                           <li className="nav-item" role="presentation">
                                               <a className="nav-link btn btn-sm btn-outline btn-outline-danger mr-2"
                                                  id="rejected-tab" data-toggle="pill" href="#rejected" role="tab"
                                                  aria-controls="rejected" aria-selected="false">Rejected</a>
                                           </li>
                                           <li className="nav-item dropdown ml-auto">
                                               <a className="nav-link btn btn-sm btn-warning shadow btn-color-option"
                                                  href="#" id="options" data-toggle="dropdown" aria-haspopup="true"
                                                  aria-expanded="false">
                                                   <i className="fas fa-ellipsis-v" />
                                               </a>
                                               <div className="dropdown-menu dropdown-menu-right" aria-labelledby="options">
                                                   <a className="dropdown-item" href="#">Mark Red</a>
                                                   <a className="dropdown-item" href="#">Mark Yellow</a>
                                                   <a className="dropdown-item" href="#">Mark Green</a>
                                                   <a className="dropdown-item" href="#">Mark Blue</a>
                                               </div>
                                           </li>
                                       </ul>
                                       <div className="tab-content" id="pills-tabContent">
                                           <div className="tab-pane fade active show"  id="all" role="tabpanel"
                                                aria-labelledby="all-tab">
                                               {loaded ? <ApplicationTable applicationForm={allApplication} all={'all'} loaded={loaded} accept={hiredApplicationHandler} declineApp={declineApplicationHandler} />
                                                   : <div className="text-center"><Spinner /></div>}
                                           </div>
                                           <div className="tab-pane fade" id="review" role="tabpanel"
                                                aria-labelledby="review-tab">
                                               {loaded ? <ApplicationTable applicationForm={underReviewApplication} loaded={loaded} accept={hiredApplicationHandler} declineApp={declineApplicationHandler} />
                                                   : <div className="text-center"><Spinner /></div>}
                                           </div>
                                           <div className="tab-pane fade" id="hired" role="tabpanel"
                                                aria-labelledby="hired-tab">
                                               {loaded ? <ApplicationTable applicationForm={hiredApplication}  loaded={loaded} hired={true} declineApp={declineApplicationHandler} activeApp={activeApplicationHandler}/> : <div className="text-center"><Spinner /></div> }
                                           </div>
                                           <div className="tab-pane fade" id="rejected" role="tabpanel"
                                                aria-labelledby="rejected-tab">
                                               {loaded ? <ApplicationTable applicationForm={declinedApplication}  decline={true} loaded={loaded} accept={hiredApplicationHandler}/> : <div className="text-center"><Spinner /></div>}
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </>
    )
};

export default Application;
