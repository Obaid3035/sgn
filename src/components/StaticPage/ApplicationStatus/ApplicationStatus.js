import React, {useEffect, useState} from "react";
import './ApplicationStatus.css'
import axios from "axios";
import Spinner from "../../UI/ProgressBar/ProgressBar";

const ApplicationStatus = ( props ) => {

    const token = localStorage.getItem('token')
    const [ApplicationData, setApplicationData] = useState([]);
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        axios.get('/application', {headers: {"Authorization": token}})
            .then((res) => {
                console.log(res.data)
                setApplicationData(res.data)
                setLoaded(true)
            })
    }, [loaded])

    return (
        <section className="job-area" id="job-area">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12 text-center mb-5">
                        <h3>Application Form Status</h3>
                    </div>
                    <div className="col-md-12">
                        <div className="table-responsive">
                            <table className="app-table app-status app-status table table-borderless" cellSpacing="0">
                                <tbody>
                                {loaded ? ApplicationData.map((application, index) => (
                                    <tr className="" key={index}>
                                        <td>
                                            <span>applied for</span> {application.jobListing.jobTitle}
                                        </td>
                                        <td>
                                            <span>location</span> {application.jobListing.jobCity}, {application.jobListing.jobCountry}
                                        </td>
                                        <td>
                                            <span>applied on</span> {application.createdAt}
                                        </td>
                                        <td className="status status-approved">
                                            <a href="#">{application.applicationStatus}</a>
                                        </td>
                                    </tr>
                                )) : <div className={'text-center'}><Spinner /></div>}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ApplicationStatus;
