import React, {useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import axios from "axios";

const EmployeeHelp = ( props ) => {
    const [message, setMessage] = useState('');
    const messageChangeHandler = (e) => {
        setMessage(e.target.value);
        console.log(e.target.value)
    }

    const successNotify = (msg) => toast.success(msg, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });

    const token = localStorage.getItem('token')


    const replyHandler = (e) => {
        e.preventDefault();
        const formData = {
            message
        }
        axios.post('/reply', formData ,{headers: {"Authorization": `Bearer ${token}`}})
            .then((res) => {
                console.log(res.data)
                setMessage('')
                successNotify('Message sent!');

            })
    }
    return (
        <div className="content ">
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
            <div className="container-fluid ">
                <div className="row ">
                    <div className="col-md-12 job-list ">
                        <div className="card ">
                            <div
                                className="card-header d-flex justify-content-between align-items-center card-header-primary ">
                                <h4 className="card-title mb-0 ">Help</h4>
                            </div>
                            <div className="card-body ">
                                <form onSubmit={replyHandler} className="pt-5 " id="reviewApplication ">
                                    <div className="form-row ">
                                        <div className="col-lg-12 ">
                                            <div className="form-group ">
                                                <label htmlFor=" ">Type Your Question:</label>
                                                <textarea className="form-control" value={message} onChange={messageChangeHandler}  cols="30 "
                                                          rows="5 " />
                                            </div>
                                        </div>
                                        <div className="col-lg-12 ">
                                            <div className="float-right ">
                                                <button type="submit " className="btn btn-primary btn-save ">SEND
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeHelp;
