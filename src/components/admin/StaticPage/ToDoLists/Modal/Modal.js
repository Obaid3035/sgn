import React from "react";
import {Form, Modal} from "react-bootstrap";

const NoticeOfIntentModal = ( props ) => (
    <Modal
        show={props.show}
        onHide={props.handleShow}
        animation={false}
        size={'lg'}
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title>Notice Of Intent</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form className="pt-5" id="addIntentForm">
                <Form.Group className="mb-4">
                    <Form.Label>What is the name of the business do you intend to visit?</Form.Label>
                    <Form.Control type="text"
                                  name="businessName"
                                  readOnly
                                  value= {props.businessName}
                    />
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label>What’s the potential?</Form.Label>
                    <Form.Control type="text"
                                  name="potential"
                                  readOnly
                                  value= {props.potential}
                    />
                </Form.Group>
                <Form.Group className="form-group mb-4">
                    <Form.Label>Select the day you plan on going on the calendar:</Form.Label>
                    <Form.Control type="text"
                                  name="planOnGoing"
                                  readOnly
                                  value= {props.planOnGoing}
                    />
                </Form.Group>
                <Form.Group className="form-group mb-4">
                    <Form.Label>Phone # of the business you intend to visit:</Form.Label>
                    <Form.Control type="tel"
                                  name="businessPhoneNumber"
                                  readOnly
                                  value= {props.businessPhoneNumber}
                    />
                </Form.Group>
                <Form.Group className="form-group mb-4">
                    <Form.Label>Please give us additional information here:</Form.Label>
                    <Form.Control as={'textarea'} className="text-left" rows="6"
                                  name="additionalInformation"
                                  readOnly
                                  value= {props.additionalInformation}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Enter points for the project</Form.Label>
                    <Form.Control
                        as={'input'}
                        type={'number'}
                        name={'points'}
                        readOnly
                        value={props.points}
                    />
                </Form.Group>
            </Form>
        </Modal.Body>
    </Modal>
)

export default NoticeOfIntentModal
