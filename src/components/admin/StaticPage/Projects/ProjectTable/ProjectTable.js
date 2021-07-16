import React from "react";
import Spinner from "../../../../UI/ProgressBar/ProgressBar";
import {Button} from "react-bootstrap";
import axios from "axios";

const ProjectTable = ( props ) => {



    return (
        <div className="table-responsive">
            <table className="table">
                    <thead className="">
                    <tr>
                        <th>#</th>
                        <th>Employee Name</th>
                        <th>Business Name</th>
                        <th>Status</th>
                        <th>Approve</th>
                        {props.payment ? '' :<><th>Points</th> <th>Actions</th></>}
                    </tr>
                    </thead>
                    <tbody>
                    { props.project.map((project, index) => {
                        console.log(project.User.applicationForm)
                        return (
                            <tr key={index}>
                                <td>{project.id}</td>
                                <td>{project.User.applicationForm ? project.User.applicationForm.firstName : 'Admin'}</td>
                                <td>{project.businessName}</td>
                                <td className="">
                                    <span className="badge badge-pill badge-info">{project.status}</span>
                                </td>
                                <Button variant={'primary'} onClick={(id) => props.onSubmit(project.id)}  size={'sm'} className={'mx-4  mb-4'}><i
                                    className="far fa-eye" /></Button>
                                {props.payment ? '' :
                                    <>
                                        <td>{project.points}</td>
                                        <td>
                                            <button
                                                role="button"
                                                onClick={() => props.handleShow(project.id)}
                                                className="btn btn-sm btn-primary"><i
                                                className="far fa-eye" /></button>
                                            { project.User.applicationForm ? props.changeStatus ?
                                                <button onClick={() => props.changeStatus(project.id)} className="btn btn-sm btn-warning">Change
                                                    Status</button> :
                                                '' : ''
                                            }
                                        </td>
                                    </>
                                }
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
        </div>
    );
};

export default ProjectTable;
