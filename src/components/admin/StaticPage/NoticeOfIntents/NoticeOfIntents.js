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
    const [noticeOfIntentForm, setNoticeOfIntentForm] = useState({
        businessName: formConfig('input', 'col-md-6', 'text', 'Business Name'),
        potential: formConfig('input', 'col-md-6', 'text', 'Potential'),
        planOnGoing: formConfig('dateTime', 'col-md-6', 'text', 'Date'),
        businessPhoneNumber: formConfig('input', 'col-md-6', 'text', 'Phone Number'),
        additionalInformation: formConfig('input', 'col-md-6', 'text', 'Additional Info'),
        points: formConfig('input', 'col-md-6', 'number', 'Points', 0 ),
        users: formConfig('select', 'col-md-12', '', 'Select Employee', '', '', '',
            []),
    })

    useEffect(() => {
        axios.get('/admin/noticeofintents')
            .then((res) => {
                setNoticeOfIntent(res.data);
                setLoaded(true)
            })
    }, [loaded])


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

    const formSubmitHandler = (e) => {
        e.preventDefault();
        setShow(false)
        const formData = {};
        for(const formElementIdentifier in noticeOfIntentForm) {
            formData[formElementIdentifier] = noticeOfIntentForm[formElementIdentifier].value;
        }

        axios.post('/admin/noticeofintent', formData)
            .then((res) => {
                console.log(res);
                Notify()
                setShow(false)
                setLoaded(false)
                setNoticeOfIntentForm({
                    businessName: formConfig('input', 'col-md-6', 'text', 'Business Name'),
                    potential: formConfig('input', 'col-md-6', 'text', 'Potential'),
                    planOnGoing: formConfig('date', 'col-md-6', 'text', 'Date', Date.now()),
                    businessPhoneNumber: formConfig('input', 'col-md-6', 'text', 'Phone Number'),
                    additionalInformation: formConfig('input', 'col-md-6', 'text', 'Additional Info'),
                    points: formConfig('input', 'col-md-6', 'number', 'Points', 0 ),
                    users: formConfig('select', 'col-md-12', '', 'Select Employee', '', '', '',
                        []),
                })
            })
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

    const handleShow = () => {
        setShow(!show)
        axios.get('/admin/users')
            .then((res) => {
                const data = res.data;
                data.unshift({label: 'Select', value: ''})
                const updatedState = {
                    ...noticeOfIntentForm
                }
                const updatedElement = {
                    ...updatedState['users']
                }
                updatedElement.elementConfig.option = res.data;
                updatedState['users'] = updatedElement
                setNoticeOfIntentForm(updatedState)
            });
    };
    const table = noticeOfIntent.map((notice, index) => {
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
                                    <button type="button" onClick={handleShow}
                                            className="btn btn-primary btn-lg">Add
                                    </button>
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
            <Modal
                show={show}
                onHide={handleShow}
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
        </Aux>
    )
}

export default NoticeOfIntents;
