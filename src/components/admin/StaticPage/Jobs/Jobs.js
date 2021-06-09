import React, {useState , useEffect} from "react";
import Aux from "../../../../hoc/Aux/Aux";
import './Jobs.css'
import formConfig from "../../../../helpers/formConfig";
import Input from "../../../UI/Input/Input";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import Job from "./Job/Job";
import { Modal, Button, Form } from "react-bootstrap";
import Spinner from "../../../UI/ProgressBar/ProgressBar";

const Jobs = (props ) => {

    const [jobData, setJobData] = useState([]);
    const [show, setShow] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [btnLoader, setBtnLoader] = useState(true);
    const [jobForm, setJobForm] = useState({
        jobCountry: formConfig('input', 'col-md-6','text', 'Country'),
        jobState: formConfig('input', 'col-md-6','text', 'State'),
        jobCity: formConfig('input', 'col-md-6','text', 'City'),
        jobTitle: formConfig('input', 'col-md-6','text', 'Title'),
        jobDescription: formConfig('textarea', 'col-md-12','text', 'Description'),
        jobBenefit: formConfig('textarea', 'col-md-12','text', 'Benefits'),
        jobRequirement: formConfig('textarea', 'col-md-12','text', 'Requirement'),
    })

    const [queryForm, setQueryForm] = useState()
    useEffect(() => {
        axios.get('/admin/job')
            .then((res) => {
                setJobData(res.data.activeJobs);
                setLoaded(true)
            })
    },[loaded])


    const formElementArray = [];
    for (const key in jobForm ) {
        formElementArray.push({
            id: key,
            config: jobForm[key],
        })
    }

    const inputChangeHandler = (event, inputIdentifier) => {
        const updatedJobForm = {
            ...jobForm
        }

        const updatedFormElement = {
            ...updatedJobForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedJobForm[inputIdentifier] = updatedFormElement;

        setJobForm(updatedJobForm);
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
        const formData = {};
        for(const formElementIdentifier in jobForm) {
            formData[formElementIdentifier] = jobForm[formElementIdentifier].value;
        }
        setBtnLoader(false)
        axios.post('/admin/job', formData)
            .then((res) => {
                console.log(res)
                setBtnLoader(true)
                setLoaded(false);
                setShow(false)
                successNotify('Job Created SuccessFully');
                setJobForm({
                    jobCountry: formConfig('input', 'col-md-6','text', 'Country'),
                    jobState: formConfig('input', 'col-md-6','text', 'State'),
                    jobCity: formConfig('input', 'col-md-6','text', 'City'),
                    jobTitle: formConfig('input', 'col-md-6','text', 'Title'),
                    jobDescription: formConfig('input', 'col-md-6','text', 'Description'),
                    jobBenefit: formConfig('input', 'col-md-6','text', 'Benefits'),
                    jobRequirement: formConfig('input', 'col-md-6','text', 'Requirement'),
                })
            })
    }

    const form = (
        <form onSubmit={formSubmitHandler}>
            <div className="form-row">
                {formElementArray.map(( formElement ) => (
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            changed={(event) => inputChangeHandler(event, formElement.id)}
                            label={formElement.config.elementConfig.placeholder}
                            class={formElement.config.elementCol}
                        />
                ))}
            </div>
            {btnLoader ? <Button type={'submit'} size={'lg'} variant={'warning'} className={'px-5'}>Submit</Button> : <Spinner />
            }
        </form>
    )

    const jobDeleteHandler = (id) => {
        setBtnLoader(false)
        axios.delete('/admin/job/' + id)
            .then((res) => {
                console.log(res);
                setLoaded(false);
                setBtnLoader(true)
                successNotify('Job Deleted SuccessFully')
            })
    }


    const jobs = jobData.map((job, index) => {
        return <Job key={index}
                    id={job.id}
                    jobTitle={job.jobTitle}
                    jobCountry={job.jobCountry}
                    jobCity={job.jobCity}
                    btnLoader={btnLoader}
                    createdAt={job.createdAt}
                    jobDelete={() => jobDeleteHandler(job.id)}
        />
    })

const handleShow = () => setShow(!show);
    console.log(props.history)

    const filterData = (e) => {
        e.preventDefault();
        const queryParams = [];
        for (let i in queryForm) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(queryForm[i]))
        }
        const queryString = queryParams.join('&');
        axios.get(`/admin/job?${queryString}`)
            .then((res) => {
                console.log(res.data.activeJobs)
                setJobData(res.data.activeJobs)
            })
    }
    const queryChangeHandler = (e) => {
        const {name, value} = e.target
        const updated = {...queryForm}
        updated[name] = value
        setQueryForm(updated)
        console.log(queryForm)
    }

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
                               <h4 className="card-title mb-0">Jobs List</h4>
                               <button type="button" onClick={handleShow}
                                       className="btn btn-primary">Add Job
                               </button>
                           </div>
                           <div className="card-body">
                               <div className="col-md-12 my-5">
                                   <form onSubmit={filterData} className="row mb-5">
                                       <div className="col-lg-3">
                                           <input type="text" className="form-control" id="job-title" name={'jobTitle'} required onChange={(e) => queryChangeHandler(e)}
                                                  placeholder="job Title, Keywords, City" />
                                       </div>
                                       <div className="col-lg-2">
                                           <input type="text" className="form-control" id="country" name={'jobCountry'} required onChange={(e) => queryChangeHandler(e)}
                                                  placeholder="Country" />
                                       </div>
                                       <div className="col-lg-2">
                                           <input type="text" className="form-control" id="State" name={'jobState'} required onChange={(e) => queryChangeHandler(e)}
                                                  placeholder="State" />
                                       </div>
                                       <div className="col-lg-2">
                                           <input type="text" className="form-control" id="city" name={'jobCity'} required onChange={(e) => queryChangeHandler(e)}
                                                  placeholder="city" />
                                       </div>
                                       <div className="col-lg-2">
                                           <button type="submit" className="btn btn-lg btn-primary mt-2">Find</button>
                                       </div>
                                   </form>
                                   <div className="row">
                                       <div className="col-md-12">
                                           {loaded ? jobs.length > 0  ? <div className="table-responsive">
                                               <table className="table text-center">
                                                   <thead className="">
                                                   <tr>
                                                       <th>
                                                           ID
                                                       </th>
                                                       <th>
                                                           Job Title
                                                       </th>
                                                       <th>
                                                           Region
                                                       </th>
                                                       <th>
                                                           Post Date
                                                       </th>
                                                       <th>
                                                           Action
                                                       </th>
                                                   </tr>
                                                   </thead>
                                                   <tbody>
                                                   {jobs}
                                                   </tbody>
                                               </table>
                                           </div> : <h3 className={'text-center'}>No Job Found</h3> :  <div className={'text-center'}><Spinner /></div>}

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
               <Modal.Title>Add Job</Modal.Title>
           </Modal.Header>
           <Modal.Body>
               {form}
           </Modal.Body>
       </Modal>
   </Aux>
);
}

export default Jobs;
