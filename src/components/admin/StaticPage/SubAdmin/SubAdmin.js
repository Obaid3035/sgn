import React, {useEffect, useState} from 'react';
import { NavLink } from "react-router-dom";
import './SubAdmin.css'
import SubAdminForm from "./SubAdminForm/SubAdminForm";
import axios from "axios";
import SubAdminTable from "./SubAdminTable/SubAdminTable";
import IntlMessages from '../../../../Util/IntlMessages';
import {Button, Form, Modal} from "react-bootstrap";
import ProgressBar from "../../../UI/ProgressBar/ProgressBar";
import SubAdminList from "./SubAdminTable/SubAdminList/SubAdminList";

const SubAdmin = ( props ) => {

    const [subAdmin, setSubAdmin] = useState([]);
    const [disabledSubAdmin, setDisabledSubAdmin] = useState([]);

    const [loader, setLoader] = useState(false);

    useEffect(() => {
        axios.get('/subAdmins')
            .then((res) => {
                console.log(res.data)
                setSubAdmin(res.data.subAdmin);
                setDisabledSubAdmin(res.data.disabledSubAdmin)
            })
    }, [loader]);

    const [formData, setFormData] = useState({
        uniqueID: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: ''
    });

    const onSubmit = (e) => {
        setLoader(true)
        e.preventDefault();
        axios.post('/subAdmin', formData)
            .then((res) => {
                console.log(res.data)
                setLoader(false)
                setFormData({
                    uniqueID: '',
                    email: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    phoneNumber: ''
                })
                setShow(!show);
            })
        console.log(formData)
    }

    const onChangeHandler = (e) => {
        const { name, value} = e.target;
        console.log(name, value);
        const updated = {...formData}
        updated[name] = value
        setFormData(updated)
        console.log(formData)
    }

    const [show, setShow] = useState(false);

    const modal = (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Group>
                        <Form.Label>ID:</Form.Label>
                        <Form.Control name={'uniqueID'} type={'text'} value={formData.uniqueID} onChange={onChangeHandler} placeholder={'Enter Unique ID'}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>First Name:</Form.Label>
                        <Form.Control type={'text'} name={'firstName'} value={formData.firstName} onChange={onChangeHandler} placeholder={'Enter First Name'}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Last Name:</Form.Label>
                        <Form.Control type={'text'} name={'lastName'} value={formData.lastName} onChange={onChangeHandler} placeholder={'Enter Last Name'}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Phone Number:</Form.Label>
                        <Form.Control type={'text'} name={'phoneNumber'} value={formData.phoneNumber} onChange={onChangeHandler} placeholder={'Enter Phone Number'}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type={'email'} name={'email'} value={formData.email} onChange={onChangeHandler} placeholder={'Enter Email'}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type={'password'} name={'password'} value={formData.password} onChange={onChangeHandler} placeholder={'Enter Password'}/>
                    </Form.Group>
                    <Button type={'submit'}>Add</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )

    const onDeleteHandler = (id) => {
        setLoader(true)
        axios.put('/subAdmin-disable/' + id)
            .then(() => {
                setLoader(false)
            })
    }

    const onEnableHandler = (id) => {
        console.log(id)
        setLoader(true)
        axios.put('/subAdmin-enable/' + id)
            .then(() => {
                setLoader(false)
            })
    }

    return (

        <div className="content">
            { modal }
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 job-list">
                        <div className="card">
                            <div
                                className="card-header d-flex justify-content-between align-items-center card-header-primary">
                                <div>
                                    <h4 className="card-title mb-0"><IntlMessages id="sub_admin" /></h4>
                                </div>
                                <div className="d-flex">
                                    <Button className={'mx-4'} onClick={() => setShow(!show)}>Add Admin</Button>
                                    <form className="project-search">
                                        <div className="input-group no-border">
                                            <input type="text" className="form-control text-white"
                                                   placeholder="Search..." />
                                            <button type="submit" className="btn btn-white btn-round btn-just-icon">
                                                <p><IntlMessages id="search" /></p>
                                                <div className="ripple-container" />
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="card-body">
                                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <a className="nav-link btn btn-sm btn-outline btn-outline-warning active mr-2"
                                           id="inProgress-tab" data-toggle="pill" href="#all" role="tab"
                                           aria-controls="warning" aria-selected="false">Enabled</a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a className="nav-link btn btn-sm btn-outline btn-outline-info mr-2"
                                           id="all-tab" data-toggle="pill" href="#completed" role="tab"
                                           aria-controls="success" aria-selected="false">Disabled</a>
                                    </li>

                                </ul>
                                <div className="tab-content" id="inProgress-tab">
                                    <div className="tab-pane fade active show" id="all" role="tabpanel"
                                         aria-labelledby="inprogress-tab">
                                        {
                                            !loader?
                                                (
                                                    <div className="table-responsive">
                                                        <table className="table table-striped to-do-list">
                                                            <thead className="">
                                                            <tr>
                                                                <th><IntlMessages id="main_id" /></th>
                                                                <th><IntlMessages id="email" /></th>
                                                                <th><IntlMessages id="role" /></th>
                                                                <th><IntlMessages id="firstName" /></th>
                                                                <th><IntlMessages id="lastName" /></th>
                                                                <th><IntlMessages id="phoneNumber" /></th>
                                                                {/*<th><IntlMessages id="permission" /></th>*/}
                                                                {/*<th><IntlMessages id="action" /></th>*/}
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {subAdmin && subAdmin.length > 0 ?
                                                                subAdmin.map((subAdmin, index) => (
                                                                    <SubAdminList
                                                                        key={index}
                                                                        id={subAdmin.id}
                                                                        onDelete={onDeleteHandler}
                                                                        email={subAdmin.email}
                                                                        roles={subAdmin.roles}
                                                                        firstName={subAdmin.firstName}
                                                                        lastName={subAdmin.lastName}
                                                                        phoneNumber={subAdmin.phoneNumber}
                                                                        status={subAdmin.status}
                                                                    />
                                                                )) : <div className="text-center">
                                                                    <p>No SubAdmin Found</p>
                                                                </div>}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                )
                                                : <div className="text-center">
                                                    <ProgressBar />
                                                </div>
                                        }
                                    </div>
                                    <div className="tab-pane fade show" id="completed" role="tabpanel"
                                         aria-labelledby="all-tab">
                                        {
                                            !loader?
                                                (
                                                    <div className="table-responsive">
                                                        <table className="table table-striped to-do-list">
                                                            <thead className="">
                                                            <tr>
                                                                <th><IntlMessages id="main_id" /></th>
                                                                <th><IntlMessages id="email" /></th>
                                                                <th><IntlMessages id="role" /></th>
                                                                <th><IntlMessages id="firstName" /></th>
                                                                <th><IntlMessages id="lastName" /></th>
                                                                <th><IntlMessages id="phoneNumber" /></th>
                                                                {/*<th><IntlMessages id="permission" /></th>*/}
                                                                {/*<th><IntlMessages id="action" /></th>*/}
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {disabledSubAdmin && disabledSubAdmin.length > 0 ?
                                                                disabledSubAdmin.map((subAdmin, index) => (
                                                                    <SubAdminList
                                                                        key={index}
                                                                        id={subAdmin.id}
                                                                        onDelete={onDeleteHandler}
                                                                        onEnable={onEnableHandler}
                                                                        email={subAdmin.email}
                                                                        roles={subAdmin.roles}
                                                                        firstName={subAdmin.firstName}
                                                                        lastName={subAdmin.lastName}
                                                                        phoneNumber={subAdmin.phoneNumber}
                                                                        status={subAdmin.status}
                                                                    />
                                                                )) : <div className="text-center">
                                                                    <p>No SubAdmin Found</p>
                                                                </div>}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                )
                                                : <div className="text-center">
                                                    <ProgressBar />
                                                </div>
                                        }
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SubAdmin;
