import './App.css';
import React, {useEffect, useState} from 'react';
import {Switch, Route, useHistory} from 'react-router-dom';
import EmployeeLayout from "./hoc/EmployeeLayout/EmployeeLayout";
import AdminLayout from "./hoc/AdminLayout/AdminLayout";
import Login from "./components/admin/Login/Login";
import UnAuthorize from "./helpers/UnAuthorize/UnAuthorize";
import NotFound from "./components/NotFound";
import {useAuth} from "./context/AuthContext";
import Layout from "./hoc/Layout/Layout";
import CandidateLayout from "./hoc/CandidateLayout/CandidateLayout";
import Welcome from "./components/StaticPage/Welcome";

//rehman3904561@cloud.neduet.edu.pk
//bY09UH7

//obaid3035@gmail.com
//S9CV9K1

const App = ( props ) => {
    let {loggedIn} = useAuth();
    if (!loggedIn) {
         loggedIn = localStorage.getItem('loggedIn')
    }
    const role = localStorage.getItem('role')

  return (
      <Switch>
          <Route exact path='/unauthorized' component={UnAuthorize} />
          {loggedIn && role.includes('admin') ? <Route path={'/admin'} render={(props) =><AdminLayout {...props} />  }/> : ''}
          {loggedIn && role.includes('employee') ? <Route path={'/employee'} render={(props) =><EmployeeLayout {...props} />  }/> : ''}
          {loggedIn && role.includes('candidate') ? <Route path={'/candidate'} render={(props) =><CandidateLayout {...props} />  }/> : ''}
          <Route path={'/admin/login'} exact component={Login} />
          <Route render={(props) => <Layout {...props}/>} />
          <Route component={NotFound} />
      </Switch>
  );
}

export default App;
