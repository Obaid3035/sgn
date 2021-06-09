import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Form, Modal} from "react-bootstrap";
import Spinner from "../../../../UI/ProgressBar/ProgressBar";
import {toast, ToastContainer} from "react-toastify";

const ContractView = ( props ) => {

    const [show, setShow] = useState(false);
    const [contract, setContract] = useState(null);
    const [contractData, setContractData] = useState([]);
    const [applicationData, setApplicationData] = useState();
    const [loaded, setLoaded] = useState(false);
    const id = props.match.params.id;

    const successNotify = () => toast.success('Contract created successfully', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });

    useEffect(() => {
        axios.get('/allContracts/'+ id)
            .then((res) => {
                console.log(res.data.contract)
                setContractData(res.data.contract);
                setApplicationData(res.data.applicationForm);
                console.log(res.data.applicationForm)
                setLoaded(true);
            })
    }, [loaded])

    const fileSelectHandler = (e) => {
        let files = e.target.files[0];
        setContract(files);
    }

    const fileUploadHandler = ( e ) => {
        e.preventDefault()
        const data = new FormData()
        data.append('contract', contract)
        axios.post('/upload/' + id, data, {
            onUploadProgress: progressEvent => {
                console.log('Upload Progress', Math.round((progressEvent.loaded / progressEvent.total) * 100) + '%')
            }
        })
            .then((res) => {
                console.log(res.data)
                successNotify();
                setContract(null);
                setLoaded(false);
                setShow(false)
            })
    }

    const handleShow = () => setShow(!show);




    return (
        <>
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
            <Modal
                show={show}
                onHide={handleShow}
                animation={false}
                size={'md'}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Contract</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={fileUploadHandler} className={'mb-4'}>
                        <Form.File
                            label={'Upload Contract'}
                            onChange={fileSelectHandler}
                            custom
                        />

                        <div className="float-right mt-3">
                            {contract ? <Button type="submit"  variant={'outline-warning'}>SEND</Button> : <Button type="submit" disabled  variant={'outline-warning'}>SEND</Button>}
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            {applicationData ? <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 job-list">
                            <div className="card">
                                <div className="card-header card-header-primary">
                                    <h4 className="card-title mb-0">{applicationData.firstName}</h4>
                                </div>

                                <div className="card-body">
                                    <div className="row mt-2 align-items-start">
                                        <div className="col-lg-12 mb-4 ml-auto text-right">
                                            <button type="button" onClick={handleShow}
                                                    className="btn btn-attachment btn-warning">
                                                <i className="fas fa-paperclip" />
                                            </button>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="card rounded shadow border mb-4 project-view-card">
                                                <h4 className="card-header">Contracts</h4>
                                                <div className="card-body">
                                                    {console.log(loaded)}
                                                    {loaded ? contractData.length > 0 ? <div className="table-responsive">
                                                        <table className="table table-striped to-do-list">
                                                            <thead className="">
                                                            <tr>
                                                                <th>#</th>
                                                                <th>Date</th>
                                                                <th>File</th>
                                                                <th>Status</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {contractData.map((i) => (
                                                                <tr>
                                                                    <td>{i.id}</td>
                                                                    <td>{i.createdAt}</td>
                                                                    <td><a href={'https://sleepy-savannah-00668.herokuapp.com/upload/'+i.id}>{i.name}</a></td>
                                                                    <td>
                                                                    <span
                                                                        className="badge badge-pill badge-warning">{i.status}</span>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                        : <h4 className={'text-center'}>No Contract Found</h4>
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
            </div> : <div className="text-center"> <Spinner /></div>}
        </>
    )
}

export default ContractView;
