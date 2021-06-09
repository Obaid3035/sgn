import React, {useEffect, useState} from "react";
import axios from "axios";
import ToDoList from "./ToDoList/ToDoList";
import NoticeOfIntentModal from "./Modal/Modal";
import Spinner from "../../../UI/ProgressBar/ProgressBar";
import {toast, ToastContainer} from "react-toastify";

const ToDoLists = (props ) => {

    const [loaded, setLoaded] = useState(false)
    const [singleToDo, setSingleToDo] = useState({
        businessName: '',
        potential: '',
        planOnGoing: '',
        businessPhoneNumber: '',
        additionalInformation: '',
        points: ''
    });
    const [toDoList, setToDoList] = useState([]);
    const [show, setShow] = useState(false);

    const token = localStorage.getItem('token');


    useEffect(() => {
        axios.get('/admin/successnotice')
            .then((res) => {

                setToDoList(res.data);
                setLoaded(true)
            });


    },[loaded])

    const handleShow = (id) => {
        setShow(!show);
        console.log(show)
        if (!show) {
            axios.get('/admin/noticeofintent/' + id)
                .then((res) => {
                    setSingleToDo(res.data)
                    console.log(singleToDo)
                })
        }
    }

    const toCompleted = (id) => {
        axios.put('/admin/tocompleted/' + id)
            .then((res) => {
                setLoaded(false)
                successNotify('Task Updated SuccessFully')
            })
    }

    const onDeleteHandler = (id) => {
        axios.delete('/admin/noticeofintent/' + id)
            .then((res) => {
                console.log(res)
                successNotify('Task Updated SuccessFully')
                setLoaded(false)
            })
    }

    const successNotify = (msg) => toast.success(msg, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });


    const table = (
        toDoList.map((todo, index) => (
            <ToDoList
                key={index}
                name={todo.User.applicationForm.firstName}
                businessName={todo.businessName}
                status={todo.status}
                id={todo.id}
                handleShow={handleShow}
                toCompletedHandler={toCompleted}
                onDeleteHandler={onDeleteHandler}
            />
        ))
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
                        <div className="col-md-12">
                            <div className="card">
                                <div
                                    className="card-header d-flex justify-content-between align-items-center card-header-primary">
                                    <h4 className="card-title mb-0">To-Dos</h4>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        {loaded ? toDoList.length > 0 ? <table className="table table-striped">
                                            <thead className="">
                                            <tr>
                                                <th>Employee Name</th>
                                                <th>Business Name</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {table}
                                            </tbody>
                                        </table> : <h3 className="text-center">No Todo's Found</h3>
                                            : <div className="text-center"> <Spinner /></div>}
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

export default ToDoLists;
