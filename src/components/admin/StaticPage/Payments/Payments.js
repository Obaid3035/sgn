import React, {useEffect, useState} from "react";
import axios from "axios";
import Spinner from "../../../UI/ProgressBar/ProgressBar";

const Payments = ( props ) => {

    const [commissionedProject, setCommissionedProject] = useState([]);
    const [loaded, setLoaded] = useState(false)


    useEffect(() => {
        axios.get('/admin/commissioned')
            .then((res) => {
                setCommissionedProject(res.data.commissionedIntent);
                console.log(res.data.commissionedIntent)
                setLoaded(true)
            })
    },[loaded])

    return (
        <div className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 job-list">
                        <div className="card">
                            <div className="card-header card-header-primary">
                                <h4 className="card-title mb-0">Payments</h4>
                            </div>
                            <div className="card-body">
                                <div className="project-section">
                                    <div className="tab-content" id="pills-tabContent">
                                        <div className="tab-pane fade active show" id="all" role="tabpanel"
                                             aria-labelledby="all-tab">
                                            <div className="table-responsive">
                                                {loaded ? commissionedProject.length > 0
                                                    ? <table className="table">
                                                        <thead className="">
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Employee Name</th>
                                                            <th>Status</th>
                                                            <th>Created At</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        { commissionedProject.map((project, index) => (
                                                            <tr key={index}>
                                                                <td>{project.id}</td>
                                                                <td>{project.User.applicationForm.firstName}</td>
                                                                <td><button disabled className={'btn-warning'} style={{'border-radius': '20px'}}>Commissioned</button></td>
                                                                <td>{project.createdAt}</td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                    </table>
                                                    : <h3 className="text-center">No Project Found</h3>
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
        </div>
    );
}

export default Payments;
