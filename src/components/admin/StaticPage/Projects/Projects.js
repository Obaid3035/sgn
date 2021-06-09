import React, {useEffect, useState} from "react";
import axios from "axios";
import ProjectTable from "./ProjectTable/ProjectTable";
import NoticeOfIntentModal from "../ToDoLists/Modal/Modal";
import Spinner from "../../../UI/ProgressBar/ProgressBar";
import {toast, ToastContainer} from "react-toastify";

const Project = ( props ) => {
    const [loaded, setLoaded] = useState(false)
    const [show, setShow] = useState(false);
    const [singleToDo, setSingleToDo] = useState({
        businessName: '',
        potential: '',
        planOnGoing: '',
        businessPhoneNumber: '',
        additionalInformation: '',
    });
    const [completedProject, setCompletedProject] = useState([]);


    useEffect(() => {
        axios.get('/admin/commissioned')
            .then((res) => {
                setCompletedProject(res.data.completedIntent);
                setLoaded(true)
            })
    },[loaded])

    const handleShow = (id) => {
        setShow(!show);
        console.log(show)
        if (!show) {
            axios.get('/admin/noticeofintent/' + id)
                .then((res) => {
                    setSingleToDo(res.data)
                })
        }
    }

    const successNotify = (msg) => toast.success(msg, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });

    const changeStatusToCommissioned = (id) => {
        axios.put('/admin/tocommissioned/' + id)
            .then((res) => {
                console.log(res.data);
                setLoaded(false)
                successNotify('Project Updated SuccessFully')
            })
    }

    return (
        <>
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
                                <div className="card-header card-header-primary">
                                    <h4 className="card-title mb-0">Projects</h4>
                                </div>
                                <div className="card-body">
                                    <div className="project-section">
                                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <a className="nav-link btn btn-sm btn-outline btn-outline-info active mr-2"
                                                   id="all-tab" data-toggle="pill" href="#all" role="tab"
                                                   aria-controls="success" aria-selected="false">Successful</a>
                                            </li>
                                        </ul>
                                        <div className="tab-content" id="pills-tabContent">
                                            <div className="tab-pane fade active show" id="all" role="tabpanel"
                                                 aria-labelledby="all-tab">
                                                {loaded ? completedProject.length > 0
                                                ? <ProjectTable
                                                        project={completedProject}
                                                        handleShow={handleShow}
                                                        changeStatus={changeStatusToCommissioned}
                                                    />
                                                : <h4 className="text-center">No Project Found</h4>
                                                : <div className="text-center"><Spinner /></div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <NoticeOfIntentModal
                show={show}
                handleShow={handleShow}
                businessName={singleToDo.businessName}
                potential={singleToDo.potential}
                planOnGoing={singleToDo.planOnGoing}
                businessPhoneNumber={singleToDo.businessPhoneNumber}
                additionalInformation={singleToDo.additionalInformation}
                points={singleToDo.points}
            />
        </>
    );
}

export default Project;
