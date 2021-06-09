import React, {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import Aux from "../../../../hoc/Aux/Aux";
import axios from "axios";
import formConfig from "../../../../helpers/formConfig";
import Input from "../../../UI/Input/Input";
import Spinner from "../../../UI/ProgressBar/ProgressBar";
import {toast, ToastContainer} from "react-toastify";

const Benefits = ( props ) => {
    const [benefitData, setBenefitData] = useState([]);
    const [show, setShow] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const [benefitForm, setBenefitForm] = useState({
        title: formConfig('input', 'col-md-12','text', 'Title'),
        description: formConfig('textarea', 'col-md-12','text', 'Description'),
    })

    useEffect(() => {
        axios.get('/admin/benefits')
            .then((res) => {
                setBenefitData(res.data);
                setLoaded(true)
            })
    },[loaded])

    const inputChangeHandler = (event, inputIdentifier) => {
        const updatedBenefitForm = {
            ...benefitForm
        }

        const updatedFormElement = {
            ...updatedBenefitForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;
        updatedBenefitForm[inputIdentifier] = updatedFormElement;

        setBenefitForm(updatedBenefitForm);
    }


    const formElementArray = [];
    for (const key in benefitForm ) {
        formElementArray.push({
            id: key,
            config: benefitForm[key],
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

    const formSubmitHandler = (e) => {
        e.preventDefault();
        setShow(false)
        const formData = {};
        for(const formElementIdentifier in benefitForm) {
            formData[formElementIdentifier] = benefitForm[formElementIdentifier].value;
        }

        axios.post('/admin/benefit', formData)
            .then((res) => {
                console.log(res);
                setShow(false)
                setLoaded(false)
                successNotify('Benefit Created SuccessFully')
                setBenefitForm({
                    title: formConfig('input', 'col-md-12','text', 'Title'),
                    description: formConfig('textarea', 'col-md-12','text', 'Description'),
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
                        label={formElement.config.elementConfig.placeholder}
                        class={formElement.config.elementCol}
                    />
                ))}
            </div>
            <Button type={'submit'} size={'lg'} variant={'warning'} className={'px-5'}>Create Benefit</Button>
        </form>
    )

    const handleShow = () => {
        setShow(!show);
    }
    const table = benefitData.map((notice, index) => {
        return (
            <tr key={index}>
                <td>{notice.id}</td>
                <td>{notice.title}</td>
                <td>{notice.description}</td>
            </tr>
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
                        <div className="col-md-12 job-list">
                            <div className="card">
                                <div
                                    className="card-header d-flex justify-content-between align-items-center card-header-primary">
                                    <h4 className="card-title mb-0">Benefits List</h4>
                                    <button type="button" onClick={handleShow}
                                            className="btn btn-primary">Add Benefit
                                    </button>
                                </div>
                                <div className="card-body">
                                    <div className="col-md-12 my-5">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="table-responsive">
                                                    {loaded ? benefitData.length > 0
                                                        ?<table className="table">
                                                            <thead className="">
                                                            <tr>
                                                                <th>
                                                                    ID
                                                                </th>
                                                                <th>
                                                                    Title
                                                                </th>
                                                                <th>
                                                                    Description
                                                                </th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {table}
                                                            </tbody>
                                                        </table>
                                                        : <h4 className="text-center">No Benefits Found</h4>
                                                        : <div className="text-center"><Spinner /></div>
                                                    }
                                                </div>
                                            </div>
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
                    <Modal.Title>Add Benefit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {form}
                </Modal.Body>
            </Modal>
        </Aux>
    );
}

export default Benefits;
