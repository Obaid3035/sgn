import React, {useEffect, useState} from "react";
import './JobReview.css'
import axios from "axios";
import {NavLink} from "react-router-dom";

const JobReview = ( props ) => {

    const [jobData, setJobData] = useState({});
    const id = props.match.params.id;
    useEffect(() => {
        axios.get('/job/' + id)
            .then((res) => {
                setJobData(res.data);
            })
    }, [])

    return (
      <>
          <section id="job-desc-header-area" className="py-5">
              <div className="container">
                  <div className="row">
                      <div className="col-md-12">
                          <div className="padding">
                              <h2>job description</h2>
                              <h3>{jobData.jobTitle}</h3>
                              <p className="mb-0">{jobData.jobCity}, {jobData.jobCountry}</p>
                              <p className="font-weight-bold">Please have your resume ready before continuing the
                                  application.</p>
                              <NavLink to={'/application/'+id} className="apply-btn get-quote btn">Apply Now</NavLink>
                          </div>
                      </div>
                  </div>
              </div>
          </section>

          <section className="job-desc-detail">
              <div className="container">
                  <div className="row">
                      <div className="col-md-12 mb-3">
                          <h3>Description</h3>
                      </div>
                      <div className="col-md-12">
                          <div className="card">
                              <div className="p-5">
                                  <p>{jobData.jobDescription}
                                  </p>
                                  <ul className="job-description">
                                      <li className="heading">Benefits:</li>
                                     <li>{jobData.jobBenefit}</li>
                                  </ul>
                                  <ul>
                                      <li className="heading"> Requirements:</li>
                                      <li>{jobData.jobRequirement}</li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
      </>
    );
}

export default JobReview;
