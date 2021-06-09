import React from "react";
import Spinner from "../../../../UI/ProgressBar/ProgressBar";

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
                        {props.payment ? '' :<><th>Points</th> <th>Actions</th></>}
                    </tr>
                    </thead>
                    <tbody>
                    { props.project.map((project, index) => (
                        <tr key={index}>
                            <td>{project.id}</td>
                            <td>{project.User.applicationForm.firstName}</td>
                            <td>{project.businessName}</td>
                            <td className="">
                                <span className="badge badge-pill badge-info">{project.status}</span>
                            </td>
                            {props.payment ? '' :
                                <>
                                    <td>{project.points}</td>
                                    <td>
                                        <button
                                            role="button"
                                            onClick={() => props.handleShow(project.id)}
                                            className="btn btn-sm btn-primary"><i
                                            className="far fa-eye" /></button>
                                        {props.changeStatus ?
                                            <button onClick={() => props.changeStatus(project.id)} className="btn btn-sm btn-warning">Change
                                                Status</button> :
                                            ''
                                        }
                                    </td>
                                </>
                            }
                        </tr>
                    ))}
                    </tbody>
                </table>
        </div>
    );
};

export default ProjectTable;
