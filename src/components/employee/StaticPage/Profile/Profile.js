import React, {useEffect, useState} from "react";
import axios from "axios";
import Spinner from "../../../UI/ProgressBar/ProgressBar";
import {toast, ToastContainer} from "react-toastify";
import {Button, Form, Modal} from "react-bootstrap";

const EmployeeProfile = ( props ) => {

    const [profileData, setProfileData] = useState();
    const [contract, setContract] = useState(null);
    const [contractData, setContractData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [benefits, setBenefits] = useState([])
    const [contractShow, setContractShow] = useState(false);
    const [payment, setPayment] = useState([]);
    const [userId, setUserId] = useState();

    const token = localStorage.getItem('token');


    useEffect(() => {
        axios.get('/role', {headers: {"Authorization": `Bearer ${token}`}})
            .then((res) => {
                console.log(res.data.role)
                setUserId(res.data.id)
                if (res.data.role.includes('candidate')) {
                    Notify('Welcome to SGN! You can now upload a profile picture.' +
                        ' Please make sure your picture is clear and it must be a portrait.' +
                        ' Please do not add any photo filter and make sure to smile as this picture may also be used to make your business card');
                }
            })


    }, [])

    useEffect(() => {
        axios.get('/profile', {headers: {"Authorization": `Bearer ${token}`}})
            .then((res) => {
                setProfileData(res.data);
                setLoaded(true)

            })
        axios.get('/contracts', {headers: {"Authorization": `Bearer ${token}`}})
            .then((res) => {
                setContractData(res.data);
                setLoaded(true)
            })

        axios.get('/employee/benefit', {headers: {"Authorization": `Bearer ${token}`}})
            .then((res) => {
                setBenefits(res.data)
                setLoaded(true)
            })

        axios.get('/payment', {headers: {"Authorization": `Bearer ${token}`}})
            .then((res) => {
                setLoaded(true)
                setPayment(res.data)
            })
    }, [loaded])

    const Notify = (msg) => toast.success(msg, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });

    // const signedContract = (id) => {
    //     console.log(loaded)
    //     axios.put('/contract/'+ id, {})
    //         .then((res) => {
    //             setLoaded(false)
    //             Notify('Application Updated Successfully');
    //         })
    // }

    const contractShowHandler = () => {
        console.log('hello')
        setContractShow(!contractShow);
    }

    const notify = (msg) => toast.success(msg ,{
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
    const contractSelectHandler = (e) => {
        let files = e.target.files[0];
        setContract(files);
    }


    const contractUploadHandler = ( e ) => {
        e.preventDefault()
        const data = new FormData()
        data.append('contract', contract)
        data.append('status', 'Employee')
        axios.post('/upload/' + userId, data, {
            onUploadProgress: progressEvent => {
                console.log('Upload Progress', Math.round((progressEvent.loaded / progressEvent.total) * 100) + '%')
            }
        })
            .then((res) => {
                console.log(res.data)
                notify('Contract Uploaded Successfully');
                setContract(null);
                setLoaded(false);
                setContractShow(false)
            })
    }



    return (
        <>
            <Modal
                show={contractShow}
                onHide={contractShowHandler}
                animation={false}
                size={'md'}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Contract</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={contractUploadHandler} className={'mb-4'}>
                        <Form.File
                            label={'Upload Contract'}
                            onChange={contractSelectHandler}
                            custom
                        />

                        <div className="float-right mt-3">
                            {contract ? <Button type="submit"  variant={'outline-warning'}>SEND</Button> : <Button type="submit" disabled  variant={'outline-warning'}>SEND</Button>}
                        </div>
                    </Form>
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
                    <div className="row justify-content-center">
                        <div className="col-lg-7">
                            <div className="card">
                                <div className="card-header card-header-primary">
                                    <h4 className="card-title">Edit Profile</h4>
                                    <p className="card-category">Complete your profile</p>
                                </div>
                                {loaded ? profileData ? <div className="card-body">
                                    <form action="" className="pt-5" id="reviewApplication">
                                        <div className="form-row">
                                            <div className="col-lg-4 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">First Name</label>
                                                    <input type="text" className="form-control" readOnly id=""
                                                           value={profileData.profile.firstName} />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">Middle Name</label>
                                                    <input type="text" className="form-control" readOnly id=""
                                                           value={profileData.profile.middleName} />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">Last Name</label>
                                                    <input type="text" className="form-control" readOnly id=""
                                                           value={profileData.profile.lastName} />
                                                </div>
                                            </div>
                                            <div className="col-lg-12 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">Street Address</label>
                                                    <input type="text" className="form-control" readOnly id=""
                                                           value={profileData.profile.streetAddress} />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">City, State, Zip Code</label>
                                                    <input type="text" className="form-control" readOnly id=""
                                                           value={profileData.profile.zipCode} />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">Phone Number</label>
                                                    <input type="tel" className="form-control" id="" name="phoneNumber"
                                                           readOnly value={profileData.profile.phoneNumber} />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">Email</label>
                                                    <input type="text" className="form-control" id="" name="email" readOnly
                                                           value={profileData.email} />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div> : <h3 className={'text-center'}>No Profile Found</h3> : <div className="text-center"><Spinner /></div>}
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="card">
                                <div className="card-header card-header-primary d-flex justify-content-between">
                                    <h4 className="card-title ">Contracts</h4>
                                    <button type="button" onClick={contractShowHandler}
                                            className="btn btn-attachment btn-warning mx-4">
                                        Add Contract
                                    </button>
                                </div>
                                <div className="card-body">
                                    {
                                        loaded ? contractData.length > 0 ? <div className="table-responsive">
                                                <table className="table">
                                                    <thead className=" text-primary">
                                                    <tr>
                                                        <th>
                                                            ID
                                                        </th>
                                                        <th>
                                                            Name
                                                        </th>
                                                        <th>
                                                            Date
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {contractData.map((i, index) => (
                                                        <tr key={index}>
                                                            <td>{i.id}</td>
                                                            <td className="text-primary">
                                                                <a href={'https://sleepy-savannah-00668.herokuapp.com/upload/'+i.id}>{i.name}</a>
                                                            </td>
                                                            <td>{i.createdAt}</td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                            : <h5 className="text-center">No Contract Found</h5>
                                            : <div className="text-center"><Spinner /></div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className={'col-lg-6'}>
                            {loaded ? benefits.length > 0
                                ? <table className="table">
                                    <thead className="">
                                    <tr>
                                        <th>#</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    { benefits.map((benefit, index) => (
                                        <tr key={index}>
                                            <td>{benefit.id}</td>
                                            <td>{benefit.title}</td>
                                            <td>{benefit.description}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table> : <h4> No Benefit Found</h4>
                                : <div className="text-center"><Spinner /></div>
                            }
                        </div>
                        <div className="col-lg-6">
                            <div className="card">
                                <div className="card-header card-header-primary d-flex justify-content-between">
                                    <h4 className="card-title ">Payment Receipt</h4>
                                </div>
                                <div className="card-body">
                                    {
                                        loaded ? payment.length > 0 ? <div className="table-responsive">
                                                <table className="table">
                                                    <thead className=" text-primary">
                                                    <tr>
                                                        <th>
                                                            ID
                                                        </th>
                                                        <th>
                                                            Name
                                                        </th>
                                                        <th>
                                                            Date
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {payment.map((i, index) => (
                                                        <tr key={index}>
                                                            <td>{i.id}</td>
                                                            <td className="text-primary">
                                                                <a href={'https://sleepy-savannah-00668.herokuapp.com/payment/'+i.id}>{i.name}</a>
                                                            </td>
                                                            <td>{i.createdAt}</td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                            : <h5 className="text-center">No Payment Found</h5>
                                            : <div className="text-center"><Spinner /></div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmployeeProfile;
