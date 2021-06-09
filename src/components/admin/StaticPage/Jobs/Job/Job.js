import React from 'react';
import {NavLink} from "react-router-dom";
import Spinner from "../../../../UI/ProgressBar/ProgressBar";

const Job = ( props ) => {

    return (
        <tr>
            <td>
                {props.id}
            </td>
            <td>
                {props.jobTitle}
            </td>
            <td>
                {`${props.jobCountry}/${props.jobCity}`}
            </td>
            <td>
                {`${props.createdAt}`}
            </td>
            <td>
                <NavLink to={'job/' + props.id} className="btn btn-primary">Edit/Show
                </NavLink>
                {props.btnLoader ? <button type="button" onClick={props.jobDelete} className="btn btn-danger">Delete
                </button> : <Spinner />}
            </td>
        </tr>
    );
}

export default Job;
