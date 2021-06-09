import React, {useEffect, useState} from "react";
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import Spinner from "../../../../UI/ProgressBar/ProgressBar";

const ViewNoticeOfIntent = ( props ) => {
    const [loaded, setLoaded] = useState(false);

    const [ formFields, setFormFields ] = useState({
        businessName: '',
        potential: '',
        planOnGoing: '',
        businessPhoneNumber: '',
        additionalInformation: '',
    })
    const [status, setStatus] =useState('')

    const id = props.match.params.id;
    useEffect(() => {
        axios.get('/admin/noticeofintent/' + id)
            .then((res) => {
                setFormFields(res.data)
                setStatus(res.data.status)
                setLoaded(true);

            })
    }, [])
    console.log(props.history)


    const inputHandler = (e) => {
        setFormFields({points: e.target.value});
    }

    const onSubmitHandler = () => {
        axios.put('/admin/noticeofintent/' + id, formFields)
            .then((res) => {
                console.log(res)
                props.history.replace('/admin/noticeofintent')
                setLoaded(false)
            })
    }

    const onDeleteHandler = () => {
        axios.delete('/admin/noticeofintent/' + id)
            .then((res) => {
                console.log(res)
                props.history.replace('/admin/noticeofintent')
                setLoaded(false)
            })
    }

    console.log(formFields)

    return (
        <div className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 job-list">
                        <div className="card">
                            <div className="card-header card-header-primary">
                                <h4 className="card-title mb-0">Details</h4>
                            </div>
                            <div className="card-body">
                                {loaded ? <Form className="pt-5" id="addIntentForm">
                                    <Form.Group className="mb-4">
                                        <Form.Label>What is the name of the business do you intend to visit?</Form.Label>
                                        <Form.Control type="text"
                                                      name="businessName"
                                                      readOnly
                                                      value= {formFields.businessName}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-4">
                                        <Form.Label>What’s the potential?</Form.Label>
                                        <Form.Control type="text"
                                                      name="potential"
                                                      readOnly
                                                      value= {formFields.potential}
                                        />
                                    </Form.Group>
                                    <Form.Group className="form-group mb-4">
                                        <Form.Label>Select the day you plan on going on the calendar:</Form.Label>
                                        <Form.Control type="text"
                                                      name="planOnGoing"
                                                      readOnly
                                                      value= {formFields.planOnGoing}
                                        />
                                    </Form.Group>
                                    <Form.Group className="form-group mb-4">
                                        <Form.Label>Phone # of the business you intend to visit:</Form.Label>
                                        <Form.Control type="tel"
                                                      name="businessPhoneNumber"
                                                      readOnly
                                                      value= {formFields.businessPhoneNumber}
                                        />
                                    </Form.Group>
                                    <Form.Group className="form-group mb-4">
                                        <Form.Label>Please give us additional information here:</Form.Label>
                                        <Form.Control as={'textarea'} className="text-left" rows="6"
                                                      name="additionalInformation"
                                                      readOnly
                                                      value= {formFields.additionalInformation}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Enter points for the project</Form.Label>
                                        <Form.Control
                                            as={'input'}
                                            type={'number'}
                                            name={'points'}
                                            value={formFields.points}
                                            onChange={inputHandler}
                                        />
                                    </Form.Group>
                                    {status === 'approved' ?  ''  :  <div className={'float-right'}>
                                        <Button variant={'primary'} onClick={onSubmitHandler}  size={'lg'} className={'mx-4  mb-4'}>Approve</Button>
                                        <Button variant={'danger'} onClick={onDeleteHandler} size={'lg'} className={'mb-4'}>Reject</Button>
                                    </div>}
                                </Form> : <div className="text-center"><Spinner/></div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewNoticeOfIntent;
