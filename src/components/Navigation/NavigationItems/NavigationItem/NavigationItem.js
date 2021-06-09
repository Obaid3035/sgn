import React from 'react';
import {NavLink} from "react-router-dom";

const NavigationItem = ( props ) => (
        <li className={'nav-item mx-2'}>
            <NavLink to={props.link} exact={props.exact} className={'nav-link ' + props.class}>{props.children}</NavLink>
        </li>
);

export default NavigationItem;
