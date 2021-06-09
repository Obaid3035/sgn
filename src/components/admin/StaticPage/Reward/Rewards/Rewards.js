import React from "react";
import {NavLink} from "react-router-dom";
import Spinner from "../../../../UI/ProgressBar/ProgressBar";

const Rewards = ( props ) => {
    return(
        <div className="table-responsive">
            {props.loaded ? props.RewardData.length > 0 ? <table className="table table-striped to-do-list">
                <thead className="">
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {props.RewardData.map((reward) => (
                    <tr>
                        <td>{reward.id}</td>
                        <td>{reward.name}</td>
                        <td>{reward.description}</td>
                        <td>{reward.createdAt}</td>
                        <NavLink to={'/admin/reward/'+ reward.id}
                                 className="btn btn-sm btn-primary ml-4 mt-3"><i
                            className="far fa-eye" /></NavLink>
                        <button className={"btn btn-sm btn-primary ml-4 mt-3"} onClick={() => props.editHandleShow(reward.id)}><i className={'far fa-bell'}/></button>
                    </tr>
                ))}
                </tbody>
            </table> : <h4 className="text-center">No Reward Found</h4>
                : <div className="text-center"><Spinner /></div>}

        </div>
    )
}

export default Rewards;
