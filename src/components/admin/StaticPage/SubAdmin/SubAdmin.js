import React, {useEffect, useState} from 'react';
import { NavLink } from "react-router-dom";
import './SubAdmin.css'
import SubAdminForm from "./SubAdminForm/SubAdminForm";
import axios from "axios";
import SubAdminTable from "./SubAdminTable/SubAdminTable";

const SubAdmin = ( props ) => {

    const [subAdmin, setSubAdmin] = useState([]);


    useEffect(() => {
        axios.get('/subAdmins')
            .then((res) => {
                setSubAdmin(res.data);
            })
        return () => {
            setSubAdmin({}); // This worked for me
        };
    }, []);

    return (
        <div className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 job-list">
                        <div className="card">
                            <div
                                className="card-header d-flex justify-content-between align-items-center card-header-primary">
                                <div>
                                    <h4 className="card-title mb-0">Sub Admins</h4>
                                </div>
                                <div className="d-flex">
                                    <form className="project-search">
                                        <div className="input-group no-border">
                                            <input type="text" className="form-control text-white"
                                                   placeholder="Search..." />
                                            <button type="submit" className="btn btn-white btn-round btn-just-icon">
                                                <p>Search</p>
                                                <div className="ripple-container" />
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="card-body">
                                <SubAdminTable subAdmin={subAdmin} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SubAdmin;
