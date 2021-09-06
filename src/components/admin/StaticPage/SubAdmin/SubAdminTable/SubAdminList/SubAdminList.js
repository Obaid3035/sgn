import React from "react";
import {NavLink} from "react-router-dom";

const SubAdminList = (props) => {
    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.email}</td>
            <td>{props.roles[0]},{props.roles[1]}</td>
            <td>{props.firstName}</td>
            <td>{props.lastName}</td>
            <td>{props.phoneNumber}</td>
            {/*<td className="">*/}
            {/*    <NavLink to={'subAdmin/' + props.id}*/}
            {/*             className="btn btn-sm btn-warning"><i*/}
            {/*        className="fas fa-edit text-primary" /></NavLink>*/}
            {/*</td>*/}
            <td>
                {/*<NavLink to={'employee/' + props.id}*/}
                {/*         className="btn btn-sm btn-primary"><i*/}
                {/*    className="far fa-eye" /></NavLink>*/}
                {/*<a role="button" className="btn btn-sm btn-danger"><i*/}
                {/*    className="far fa-trash-alt" /></a>*/}
            </td>
        </tr>
    )
}

export default SubAdminList;
