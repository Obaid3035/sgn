import React, {useState} from 'react';
import EmployeeList from "./EmployeeList/EmployeeList";
import Spinner from "../../../../UI/ProgressBar/ProgressBar";

const EmployeeTable = ( props ) => {
    console.log(props.loaded)

    return (
        props.loaded ? props.employee.length > 0 ? <div className="table-responsive">
            <table className="table table-striped to-do-list">
                <thead className="">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Location</th>
                    <th>Role</th>
                    <th>Status</th>
                    {
                        props.fired ? null :
                            <>
                                <th>Benefits</th>
                                <th>Action</th>
                            </>
                    }
                </tr>
                </thead>
                <tbody>
                { props.employee.map((employee, index) => (
                    <EmployeeList
                        key={index}
                        id={employee.id}
                        role={employee.roles}
                        referralID={employee.applicationForm.referralID}
                        firstName={employee.applicationForm.firstName}
                        jobTitle={employee.applicationForm.jobListing.jobTitle}
                        jobCountry={employee.applicationForm.jobListing.jobCountry}
                        jobCity={employee.applicationForm.jobListing.jobCity}
                        applicationStatus={employee.applicationForm.applicationStatus}
                        inActive={props.inActiveHandler}
                        fired={props.fired}
                    />
                ))}
                </tbody>
            </table>
        </div> : <h4 className="text-center">No Employee Found</h4> : <div className="text-center"><Spinner /></div>
    );
}
export default EmployeeTable;
