import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Modal, Form} from "react-bootstrap";
import Aux from "../../../../hoc/Aux/Aux";
import Input from "../../../UI/Input/Input";
import formConfig from "../../../../helpers/formConfig";
import NoticeOfIntent from "./NoticeOfIntent/NoticeOfIntent";
import Spinner from "../../../UI/ProgressBar/ProgressBar";
import {toast, ToastContainer} from "react-toastify";

const NoticeOfIntents = () => {

    const [noticeOfIntent, setNoticeOfIntent] = useState([]);
    const [show, setShow] = useState(false);
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        axios.get('/admin/noticeofintents')
            .then((res) => {
                setNoticeOfIntent(res.data);
                console.log(noticeOfIntent)
                setLoaded(true)
            })
    }, [loaded])












    const table =  noticeOfIntent.map((notice, index) => {
        return (
            <NoticeOfIntent
                key={index}
                id={notice.id}
                firstName={notice.User.applicationForm.firstName}
                businessName={notice.businessName}
                createdAt={notice.createdAt}
                status={notice.status}
            />
        )
    })

    return (
        <Aux>
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
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header d-flex justify-content-between align-items-center card-header-primary">
                                    <h4 className="card-title mb-0">Notice Of Intent</h4>

                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        {loaded ? noticeOfIntent.length > 0 ? <table className="table table-striped">
                                            <thead className="">
                                            <tr>
                                                <th>#</th>
                                                <th>Created By</th>
                                                <th>Business Name</th>
                                                <th>Date/Time</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {table}
                                            </tbody>
                                        </table> : <h4 className={'text-center'}>No Notice Of Intent Found</h4> : <div className="text-center"><Spinner /></div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Aux>
    )
}

export default NoticeOfIntents;
