import React, {useEffect, useState} from "react";
import {Form, Dropdown, Button} from "react-bootstrap";
import DatePicker from "react-datepicker";
import axios from "axios";

const Report = ( props ) => {

    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('')
    const [user, setUser] = useState('');
    const [startDate, setStartDate] = useState('');
    const [userArr, setUserArr] = useState([]);
    const [completedTask, setCompletedTask] = useState([])
    const [underReviewTask, setUnderReviewTask] = useState([])
    const [approvedTask, setApprovedTask] = useState([])
    const [endDate, setEndDate] = useState('');


    useEffect(() => {
        axios.get('/admin/users')
            .then((res) => {
                setUserArr(res.data);
                console.log(res.data)
            })
    }, [])


    const fromDateHandler =(time)=> {
        setFromDate(time)
        const startDate = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`;
        setStartDate(startDate)
    }

    const toDateHandler = (time) => {
        setToDate(time)
        const endDate = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`;
        setEndDate(endDate)
    }
    const handleChange = (e) => {
        setUser(e.target.value)
    }

    const onSubmitHandler = ( e ) => {
        e.preventDefault();
        const formData = {
            user,
            startDate,
            endDate
        }
        axios.get(`/admin/report?user=${user}&startDate=${startDate}&endDate=${endDate}`)
            .then((res) => {
                console.log(res.data)
                setApprovedTask(res.data.approvedTask);
                setCompletedTask(res.data.completedTask);
                setUnderReviewTask(res.data.underReviewTask)
            })
        console.log(formData)
    }



    return (
        <div className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header card-header-primary">
                                <h4 className="card-title mb-0">Report</h4>
                            </div>
                            <div className="card-body">
                                <Form onSubmit={onSubmitHandler} className={'d-flex justify-content-around'}>
                                    <Form.Group>
                                        <select value={user} onChange={handleChange}>
                                            <option selected value={''}>--Select--</option>
                                            {userArr.map((user, index) =>  (
                                                    <option key={index} value={user.value}>{user.label}</option>
                                                )
                                            )}
                                        </select>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label> From</Form.Label>
                                        <DatePicker selected={fromDate}
                                                    onChange={fromDateHandler}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label> To</Form.Label>
                                        <DatePicker selected={toDate}
                                                    onChange={toDateHandler}
                                        />
                                    </Form.Group>

                                    <Button type={'submit'} className={'px-4 h-25'} variant={'warning'}>Search</Button>
                                </Form>

                               <div className={'d-flex justify-content-between'}>
                                   <div>
                                       <h4>Completed Task</h4>
                                       {completedTask ? <h4 className={'text-center'}>{completedTask.length}</h4>  : <h5>No Task Found</h5> }
                                   </div>
                                   <div>
                                       <h4>Approved Task</h4>
                                       {approvedTask ? <h4 className={'text-center'}>{approvedTask.length}</h4>  : <h5>No Task Found</h5> }
                                   </div>
                                   <div>
                                       <h4>UnderReview Task</h4>
                                       {underReviewTask ? <h4 className={'text-center'}>{underReviewTask.length}</h4>  : <h5>No Task Found</h5> }
                                   </div>
                               </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Report;
