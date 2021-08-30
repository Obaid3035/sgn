import React from "react";
import { NavLink } from 'react-router-dom';
import IntlMessages from '../Util/IntlMessages';

const NotFound = () => (
    <div>
        <h1><IntlMessages id="404_error" /></h1>
        <NavLink to="/">
        <IntlMessages id="go_home" />    
        </NavLink>
    </div>
)

export default NotFound;
