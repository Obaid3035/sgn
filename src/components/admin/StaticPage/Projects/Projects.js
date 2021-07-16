import React, {useEffect, useState} from "react";
import axios from "axios";
import ProjectTable from "./ProjectTable/ProjectTable";
import NoticeOfIntentModal from "../ToDoLists/Modal/Modal";
import Spinner from "../../../UI/ProgressBar/ProgressBar";
import {toast, ToastContainer} from "react-toastify";
import {Button, Modal} from "react-bootstrap";
import formConfig from "../../../../helpers/formConfig";
import Input from "../../../UI/Input/Input";

const Project = ( props ) => {
    const token = localStorage.getItem('token')
    const [loaded, setLoaded] = useState(false)
    const [show, setShow] = useState(false);
    const [addShow, setAddShow] = useState(false);
    const [singleToDo, setSingleToDo] = useState({
        businessName: '',
        potential: '',
        planOnGoing: '',
        businessPhoneNumber: '',
        additionalInformation: '',
    });
    const [completedProject, setCompletedProject] = useState([]);

    const [noticeOfIntentForm, setNoticeOfIntentForm] = useState({
        businessName: formConfig('input', 'col-md-6', 'text', 'Business Name'),
        potential: formConfig('input', 'col-md-6', 'text', 'Potential'),
        planOnGoing: formConfig('dateTime', 'col-md-6', 'text', 'Date'),
        businessPhoneNumber: formConfig('input', 'col-md-6', 'text', 'Phone Number'),
        additionalInformation: formConfig('input', 'col-md-6', 'text', 'Additional Info'),
    })

    useEffect(() => {
        axios.get('/admin/commissioned')
            .then((res) => {
                setCompletedProject(res.data.completedIntent);
                setLoaded(true)
                console.log(completedProject)
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

    const formElementArray = [];
    for (const key in noticeOfIntentForm ) {
        formElementArray.push({
            id: key,
            config: noticeOfIntentForm[key],
        })
    }


    const Notify = () => toast.success('Notice Of Intent Updated Successfully', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
    const inputChangeHandler = (event, inputIdentifier) => {
        const updatedNoticeForm = {
            ...noticeOfIntentForm
        }

        const updatedFormElement = {
            ...updatedNoticeForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;
        updatedNoticeForm[inputIdentifier] = updatedFormElement;

        setNoticeOfIntentForm(updatedNoticeForm);
    }
    const datePickerHandler =(date, inputIdentifier)=> {

        const updatedNoticeForm = {
            ...noticeOfIntentForm
        }

        const updatedFormElement = {
            ...updatedNoticeForm[inputIdentifier]
        }

        updatedFormElement.value = date;
        updatedNoticeForm[inputIdentifier] = updatedFormElement;

        setNoticeOfIntentForm(updatedNoticeForm);
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        setShow(false)
        const formData = {};
        for(const formElementIdentifier in noticeOfIntentForm) {
            formData[formElementIdentifier] = noticeOfIntentForm[formElementIdentifier].value;
        }
        axios.post('/admin/create-notice', formData, {headers: {"Authorization": token}})
            .then((res) => {
                console.log(res);
                Notify()
                setAddShow(!addShow)
                setLoaded(false)
                setNoticeOfIntentForm({
                    businessName: formConfig('input', 'col-md-6', 'text', 'Business Name'),
                    potential: formConfig('input', 'col-md-6', 'text', 'Potential'),
                    planOnGoing: formConfig('date', 'col-md-6', 'text', 'Date', Date.now()),
                    businessPhoneNumber: formConfig('input', 'col-md-6', 'text', 'Phone Number'),
                    additionalInformation: formConfig('input', 'col-md-6', 'text', 'Additional Info'),
                })
            })
    }

    const form = (
        <form onSubmit={formSubmitHandler}>
            <div className="form-row">
                {formElementArray.map(( formElement, index ) => (
                    <Input
                        key={index}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => inputChangeHandler(event, formElement.id)}
                        datePickerHandler={(e) => datePickerHandler(e, formElement.id)}
                        label={formElement.config.elementConfig.placeholder}
                        class={formElement.config.elementCol}
                    />
                ))}
            </div>
            <Button type={'submit'} size={'lg'} variant={'warning'} className={'px-5'}>Create Intent</Button>
        </form>
    )

    const toDoHandleShow = () => {
        setAddShow(!addShow)
    };

    const onSubmitHandler = (id) => {
        axios.put('/admin/noticeofintent/' + id)
            .then((res) => {
                console.log(res)
                props.history.replace('/admin/noticeofintent')
                setLoaded(false)
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
                                <div className="card-header d-flex justify-content-between align-items-center card-header-primary">
                                    <h4 className="card-title mb-0">Projects</h4>
                                    <button type="button" onClick={toDoHandleShow}
                                            className="btn btn-primary btn-lg">Add
                                    </button>
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
                                                        onSubmit={onSubmitHandler}
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
            <Modal
                show={addShow}
                onHide={toDoHandleShow}
                animation={false}
                size={'lg'}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Notice</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {form}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Project;
