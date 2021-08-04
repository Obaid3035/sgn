import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {Button, Modal, Form} from "react-bootstrap";
import { Multiselect } from "multiselect-react-dropdown";
import axios from "axios";
import Spinner from "../../../UI/ProgressBar/ProgressBar";
import {toast, ToastContainer} from "react-toastify";
import Rewards from "./Rewards/Rewards";


const Reward = ( props ) => {
    const [show, setShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [activeRewardData, setActiveRewardData] = useState([])
    const [inActiveReward, setInActiveRewardData] = useState([])
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [limit, setLimit] = useState(0);
    const [user, setUser] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [rewardId, setRewardId] = useState();
    useEffect(() => {
        axios.get('/admin/rewards')
            .then((res) => {
                setActiveRewardData(res.data.onGoingReward);
                setInActiveRewardData(res.data.completedReward);
                setLoaded(true)
            })

        axios.get('/admin/rewardUsers')
            .then((res) => {
                setEmployee(res.data)
            })
    }, [loaded])

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
            name,
            description,
            limit,
            user
        }
        console.log(formData)

        axios.post('/admin/reward', formData)
            .then((res) => {
                console.log(res.data)
                setLoaded(false)
                setName('');
                setDescription('');
                setUser([])
                setLimit(0)
                successNotify('Rewards Created SuccessFully');
            })

    }

    const editSubmitHandler = (e) => {
        e.preventDefault();
        setShow(false)
        const formData = {
            name,
            description,
            limit,
        }
        axios.put('/admin/reward/'+rewardId, formData)
            .then((res) => {
                console.log(res.data)
                setEditShow(false)
                setLoaded(false)
                setName('');
                setDescription('');
                setLimit(0)
                successNotify('Rewards Updated SuccessFully');

            })
    }

    const nameChangeHandler = (e) => {
        setName(e.target.value);
        console.log(name)
    }
    const descriptionChangeHandler = (e) => {
        setDescription(e.target.value);
    }
    const limitChangeHandler = (e) => {
        setLimit(e.target.value);
    }
    const userChangeHandler = (list, item) => {
        setUser(list);
    }
    const form = (
        <Form onSubmit={formSubmitHandler}>
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control value={name} onChange={nameChangeHandler} required />
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control value={description} onChange={descriptionChangeHandler} required />
            </Form.Group>
            <Form.Group>
                <Form.Label>Limit</Form.Label>
                <Form.Control value={limit} type={'number'} onChange={limitChangeHandler} required />
            </Form.Group>
            <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>User</Form.Label>
                <Multiselect options={employee} isObject={false} onSelect={userChangeHandler} required />
            </Form.Group>
            <Button type={'submit'} size={'lg'} variant={'warning'} className={'px-5'}>Create Reward</Button>
        </Form>
    )
    const handleShow = () => {
        setShow(!show)

    };
    const editHandleShow = (id) => {
        setEditShow(!editShow)
        setRewardId(id);
    };
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
                                <div className="card-header d-flex justify-content-between align-items-center card-header-primary">
                                    <h4 className="card-title mb-0">Reward</h4>
                                    <button type="button" onClick={handleShow}
                                            className="btn btn-primary btn-lg">Add
                                    </button>
                                </div>
                                <div className="card-body">
                                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link btn btn-sm btn-outline btn-outline-info active mr-2"
                                               id="onGoing-tab" data-toggle="pill" href="#onGoing" role="tab"
                                               aria-controls="onGoing" aria-selected="false">Active</a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link btn btn-sm btn-outline btn-outline-success mr-2"
                                               id="completed-tab" data-toggle="pill" href="#completed" role="tab"
                                               aria-controls="completed" aria-selected="true">inActive</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="pills-tabContent">
                                        <div className="tab-pane fade  active show" id="onGoing" role="tabpanel"
                                             aria-labelledby="onGoing-tab">
                                            {loaded ?  <Rewards RewardData={activeRewardData} loaded={loaded} editHandleShow={editHandleShow} />
                                                : <div className="text-center"><Spinner /></div>}
                                        </div>
                                        <div className="tab-pane fade" id="completed" role="tabpanel"
                                             aria-labelledby="completed-tab">
                                            {loaded ? <Rewards RewardData={inActiveReward} loaded={loaded}  editHandleShow={editHandleShow} />
                                                : <div className="text-center"><Spinner /></div>}
                                        </div>
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
                    <Modal.Title>Add Job</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {form}
                </Modal.Body>
            </Modal>

            <Modal
                show={editShow}
                onHide={editHandleShow}
                animation={false}
                size={'lg'}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Reward</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={editSubmitHandler}>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control value={name} onChange={nameChangeHandler} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control value={description} onChange={descriptionChangeHandler} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Limit</Form.Label>
                            <Form.Control value={limit} type={'number'} onChange={limitChangeHandler} required />
                        </Form.Group>
                        <Button type={'submit'} size={'lg'} variant={'warning'} className={'px-5'}>Edit Reward</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
export default Reward;
