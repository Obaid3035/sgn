import React, {useEffect, useState} from "react";
import {Form, Modal} from "react-bootstrap";
import axios from "axios";
import Spinner from "../../../UI/ProgressBar/ProgressBar";
import { Multiselect } from "multiselect-react-dropdown";
import {toast, ToastContainer} from "react-toastify";


const Chats = ( props ) => {
    const [loaded, setLoaded] = useState(false);
    const [show, setShow] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [chat, setChat] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [user, setUser] = useState([]);
    const [message, setMessage] = useState('');
    const [chatMessage, setChatMessage] = useState('hello');
    const [reply, setReply] = useState('');
    const [receiver, setReceiver] = useState();


    const handleShow = () => setShow(!show);
    const messageHandleShow = (message, id) => {
        setShowMessage(!showMessage);
        console.log(message)
        setChatMessage(message)
        setReceiver(id)
    }
    const token = localStorage.getItem('token')

    useEffect(() => {
        axios.get('/admin/messages', {headers: {"Authorization": `Bearer ${token}`}})
            .then((res) => {
                setChat(res.data)
                setLoaded(true)
            })
        axios.get('/admin/rewardUsers')
            .then((res) => {
                setEmployee(res.data)
            })
    }, [loaded])
    const userChangeHandler = (list, item) => {
        setUser(list);
    }
    console.log(employee)
    const successNotify = (msg) => toast.success(msg, {
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
        const formData = {
            message,
            userName: user
        }
        console.log(formData)

        axios.post('/admin/message', formData, {headers: {"Authorization": `Bearer ${token}`}})
            .then((res) => {
                console.log(res.data)
                setShow(false)
                setLoaded(false)
                setMessage('');
                setUser([])
                successNotify('Message sent!');

            })

    }
    const messageChangeHandler = (e) => {
        setMessage(e.target.value);
    }

    const replyChangeHandler = (e) => {
        setReply(e.target.value);
    }
    const replyHandler = (e) => {
        e.preventDefault();
        const formData = {
            message: reply
        }
        axios.post('/adminReply/'+ receiver, formData ,{headers: {"Authorization": `Bearer ${token}`}})
            .then((res) => {
                console.log(res.data)
                setLoaded(false)
                setShowMessage(false)
                setReply('')
                successNotify('Message sent!');

            })
    }

    const form = (
        <Form onSubmit={formSubmitHandler} className="add-task-form pt-5">
            <div className="form-row">
                <div className="col-lg-12 mb-4">
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>Enter Recipient:</Form.Label>
                        <Multiselect options={employee} isObject={false} onSelect={userChangeHandler} required />
                    </Form.Group>
                </div>
                <div className="col-lg-12 mb-4">
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>Message:</Form.Label>
                        <textarea value={message} onChange={messageChangeHandler} className="form-control" required />
                    </Form.Group>
                </div>
            </div>
            <div className="float-right">
                <button type="button" className="btn btn-secondary">Discard</button>
                <button type="submit"  className="btn btn-primary btn-save">Send Message</button>
            </div>
        </Form>
    )
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
                        <div className="col-md-12 job-list">
                            <div className="card">
                                <div
                                    className="card-header d-flex justify-content-between align-items-center card-header-primary">
                                    <h4 className="card-title mb-0">Inbox</h4>
                                    <button onClick={handleShow} className="btn btn-secondary"><i
                                        className="fas fa-pencil mr-2" />Compose</button>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        {loaded ? chat.length > 0 ?    <table className="table">
                                            <thead className="">
                                            <th>#</th>
                                            <th>
                                                Date
                                            </th>
                                            <th>
                                                Sender
                                            </th>
                                            <th>
                                                Action
                                            </th>
                                            </thead>
                                            <tbody>
                                            {chat.map((chat) => (
                                            <tr>
                                                        <td>
                                                            {chat.id}
                                                        </td>
                                                        <td>
                                                            {chat.createdAt}
                                                        </td>
                                                        <td>
                                                            {chat.sender.email}
                                                        </td>
                                                        <td>
                                                            <button type="button" onClick={() => messageHandleShow(chat.message, chat.senderId)}
                                                                    className="btn btn-sm btn-primary">
                                                                <i className="fas fa-eye mr-2" />View
                                                            </button>
                                                        </td>
                                                    </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                            : <h4 className={'text-center'}>No Message Found</h4> : <div className={'text-center'}><Spinner /></div> }

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
                size={'md'}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Compose</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {form}
                </Modal.Body>
            </Modal>

            <Modal
                show={showMessage}
                onHide={messageHandleShow}
                animation={false}
                size={'md'}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="view-message">
                        <div className="form-group">
                            <label htmlFor="team"
                                   className="col-form-label">Recipient:</label>
                            <input type="text" className="form-control" readOnly
                                   id="team" name="team" value="Admin" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message"
                                   className="col-form-label">Message</label>
                            <textarea className="form-control" rows="6" readOnly
                                      id="message" name="message">{chatMessage}</textarea>
                        </div>
                    </form>
                    <form onSubmit={replyHandler} className="reply-form" id="reply-form">
                        <div className="col-lg-12 mb-4">
                            <label htmlFor="">Reply:</label>
                            <textarea onChange={replyChangeHandler} value={reply} required
                                      className="form-control" />
                        </div>
                        <div className="pull-right">
                            <button type="submit"
                                    className="btn btn-primary btn-save">Reply
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Chats;
