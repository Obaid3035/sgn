import React from "react";

const ProjectTable = ( props ) => {
    return (
        <table className="table">
            <thead className="">
            <tr>
                <th>#</th>
                <th>Assigned By</th>
                <th>Business Name</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {props.project.map((project, index) => (
                <tr key={index}>
                    <td>{project.id}</td>
                    <td>{project.User.applicationForm.firstName}</td>
                    <td>{project.businessName}</td>
                    <td className="">
                        <span className="badge badge-pill badge-info" >{project.status}</span>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default ProjectTable;
