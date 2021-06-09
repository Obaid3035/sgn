import React from 'react';
import {NavLink} from "react-router-dom";
import SubAdminList from "./SubAdminList/SubAdminList";

const SubAdminTable = ( props ) => {
    return (
        <div className="table-responsive">
            <table className="table table-striped to-do-list">
                <thead className="">
                <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Permissions</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {props.subAdmin.map((subAdmin, index) => (
                    <SubAdminList
                        key={index}
                        id={subAdmin.id}
                        email={subAdmin.email}
                        roles={subAdmin.roles}
                    />
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default SubAdminTable;
