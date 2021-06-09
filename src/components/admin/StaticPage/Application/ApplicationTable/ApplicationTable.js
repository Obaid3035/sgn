import React from "react";
import ApplicationList from "../ApplicationList/ApplicationList";
import Spinner from "../../../../UI/ProgressBar/ProgressBar";

const ApplicationTable = ( props ) => (
    <div className="table-responsive">
        {props.loaded ? (props.applicationForm.length > 0 ? <table className="table" id="applications-list-table">
            <thead className="">
            <tr>
                <th>
                    ID
                </th>
                <th>
                    Applicant Name
                </th>
                <th>
                    Location
                </th>
                <th>
                    Applied For
                </th>
                {props.all ? <th>Status</th>: ''}
                <th>
                    Applied on
                </th>
                <th>
                    Action
                </th>
            </tr>

            </thead>
            <tbody>
            {props.applicationForm.map((application, index) => (
                <ApplicationList
                    key={index}
                    id={application.id}
                    all={props.all}
                    firstName={application.firstName}
                    status={application.applicationStatus}
                    Hired={props.hired}
                    Decline={props.decline}
                    jobCountry={application.jobListing.jobCountry}
                    jobTitle={application.jobListing.jobTitle}
                    createdAt={application.createdAt}
                    hired={props.accept}
                    decline={props.declineApp}
                    active={props.activeApp}
                />
            ))}
            </tbody>
        </table> : <h3 className={'text-center'}>No Application Found</h3>) : <div className="text-center"><Spinner /></div>}
    </div>
)

export default ApplicationTable;
