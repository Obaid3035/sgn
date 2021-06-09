import React, {useEffect, useState} from "react";
import axios from "axios";
import Spinner from "../../../UI/ProgressBar/ProgressBar";
import {ProgressBar} from "react-bootstrap";
import {NavLink} from "react-router-dom";


const EmployeeRewards = ( props ) => {
    const token = localStorage.getItem('token')
    const [rewards, setRewards] = useState([]);
    const [totalPoints, setTotalPoints] = useState(0)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        axios.get('/employee/allRewards', {headers: {"Authorization": token}})
            .then((res) => {
                setRewards(res.data.rewards.rewards)
                setTotalPoints(res.data.totalPoints)
                setLoaded(true)
            })
    }, [loaded])

    return (
        <div className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 job-list">
                        <div className="card">
                            <div className="card-header card-header-primary">
                                <h4 className="card-title mb-0">Rewards</h4>
                            </div>
                            <div className="card-body">
                                <div className="project-section">
                                    <div className="tab-content" id="pills-tabContent">
                                        <div className="tab-pane fade active show" id="all" role="tabpanel"
                                             aria-labelledby="all-tab">
                                            <div className="table-responsive">
                                                {loaded ? rewards.length > 0
                                                    ? <table className="table">
                                                        <thead className="">
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Name</th>
                                                            <th>Status</th>
                                                            <th>Progress</th>
                                                            <th>Created At</th>
                                                            <th>Action</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        { rewards.map((reward, index) => (
                                                            <>
                                                                <tr key={index}>
                                                                    <td>{reward.id}</td>
                                                                    <td>{reward.name}</td>
                                                                    <td>{reward.status}</td>
                                                                    <td><ProgressBar animated now={(totalPoints * 100) / (reward.limit)}/></td>
                                                                    <td>{reward.createdAt}</td>
                                                                    {reward.status === 'Completed' ? null :
                                                                        <td>
                                                                            <NavLink to={'/employee/reward/' + reward.id} role="button"
                                                                                     className="btn btn-sm btn-primary"><i className="far fa-eye" /></NavLink>
                                                                        </td>
                                                                    }
                                                                </tr>
                                                            </>
                                                        )) }
                                                        </tbody>
                                                    </table>
                                                    : <h3 className="text-center">No Reward Found</h3>
                                                    : <div className="text-center"><Spinner /></div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeRewards;



