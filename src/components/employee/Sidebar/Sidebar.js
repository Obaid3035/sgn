import React  from "react";
import { useLocation, NavLink } from "react-router-dom";
import Logo from '../../../assets/img/logo.png'

import { Nav } from "react-bootstrap";

function Sidebar({ color, image, user }) {
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")",
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <a
            href="https://www.creative-tim.com?ref=lbd-sidebar"
            className="simple-text logo-mini mx-1"
          >
            <div className="logo-img">
              <img
                src={Logo}
                alt="..."
              />
            </div>
          </a>
          <a className="simple-text" href="http://www.creative-tim.com">
            SGN
          </a>
        </div>
        <Nav>
          {(user.role.includes('subAdmin') || user.role.includes('employee')) ?   <>
            {user.roleDetail.dashboard ?
                <li className={activeRoute('/employee/dashboard')}>
                  <NavLink
                      to={'/employee/dashboard'}
                      className="nav-link"
                      activeClassName="active">
                    <i className={'fa fa-home'} />
                    <p>{'Dashboard'}</p>
                  </NavLink>
                </li> : ''}


            {user.roleDetail.subAdmin ?
                <li className={activeRoute('/employee/subAdmin')}>
                  <NavLink
                      to={'/employee/subAdmin'}
                      className="nav-link"
                      activeClassName="active"
                  >
                    <i className={'fas fa-user-tie'} />
                    <p>{'Sub Admin'}</p>
                  </NavLink>
                </li> : ''
            }

            {
              user.roleDetail.employee ?
                  <li className={activeRoute('/employee/employee')}>
                    <NavLink
                        to={'/employee/employee'}
                        className="nav-link"
                        activeClassName="active"
                    >
                      <i className={'fas fa-users'} />
                      <p>{'Employee'}</p>
                    </NavLink>
                  </li>
                  : ''
            }

            {
              user.roleDetail.job ?
                  <li className={activeRoute('/employee/job')}>
                    <NavLink
                        to={'/employee/job'}
                        className="nav-link"
                        activeClassName="active"
                    >
                      <i className={'fas fa-briefcase'} />
                      <p>{'Job'}</p>
                    </NavLink>
                  </li>
                  : ''
            }

            {
              user.roleDetail.application ?
                  <li className={activeRoute('/employee/application')}>
                    <NavLink
                        to={'/employee/application'}
                        className="nav-link"
                        activeClassName="active"
                    >
                      <i className={'fas fa-clipboard-list'} />
                      <p>{'Application'}</p>
                    </NavLink>
                  </li>
                  : ''
            }

            {
              user.roleDetail.project ?
                  <li className={activeRoute('/employee/project')}>
                    <NavLink
                        to={'/employee/project'}
                        className="nav-link"
                        activeClassName="active"
                    >
                      <i className={'fas fa-project-diagram'} />
                      <p>{'Project'}</p>
                    </NavLink>
                  </li>
                  : ''
            }

            {
              user.roleDetail.noticeOfIntent ?
                  <li className={activeRoute('/employee/noticeofintent')}>
                    <NavLink
                        to={'/employee/noticeofintent'}
                        className="nav-link"
                        activeClassName="active"
                    >
                      <i className={'fas fa-clipboard-check'} />
                      <p>{'Notice Of Intent'}</p>
                    </NavLink>
                  </li>
                  : ''
            }

            {
              user.roleDetail.todoList ?
                  <li className={activeRoute('/employee/todoList')}>
                    <NavLink
                        to={'/employee/todoList'}
                        className="nav-link"
                        activeClassName="active"
                    >
                      <i className={'fas fa-list'} />
                      <p>{'Todo List'}</p>
                    </NavLink>
                  </li>
                  : ''
            }

            {
              user.roleDetail.payment ?
                  <li className={activeRoute('/employee/payment')}>
                    <NavLink
                        to={'/employee/payment'}
                        className="nav-link"
                        activeClassName="active"
                    >
                      <i className={'fa fa-credit-card'} />
                      <p>{'Payment'}</p>
                    </NavLink>
                  </li>
                  : ''
            }

            {
              user.roleDetail.benefit ?
                  <li className={activeRoute('/employee/benefit')}>
                    <NavLink
                        to={'/employee/benefit'}
                        className="nav-link"
                        activeClassName="active"
                    >
                      <i className={'fa fa-magic'} />
                      <p>{'Benefit'}</p>
                    </NavLink>
                  </li>
                  : ''
            }

            <li className={activeRoute('/employee/profile')}>
              <NavLink
                  to={'/employee/profile'}
                  className="nav-link"
                  activeClassName="active"
              >
                <i className={'fa fa-user'} />
                <p>{'Profile'}</p>
              </NavLink>
            </li>
            <li className={activeRoute('/employee/noticeofintent')}>
              <NavLink
                  to={'/employee/noticeofintent'}
                  className="nav-link"
                  activeClassName="active"
              >
                <i className={'fas fa-clipboard-check'} />
                <p>{'Current Notice'}</p>
              </NavLink>
            </li>

            <li className={activeRoute('/employee/todoList')}>
              <NavLink
                  to={'/employee/todoList'}
                  className="nav-link"
                  activeClassName="active"
              >
                <i className={'nc-icon nc-alien-33'} />
                <p>{'Current TodoList'}</p>
              </NavLink>
            </li>
            <li className={activeRoute('/employee/project')}>
              <NavLink
                  to={'/employee/project'}
                  className="nav-link"
                  activeClassName="active"
              >
                <i className={'fas fa-list'} />
                <p>{'Current Project'}</p>
              </NavLink>
            </li>
            <li className={activeRoute('/employee/reward')}>
              <NavLink
                  to={'/employee/reward'}
                  className="nav-link"
                  activeClassName="active"
              >
                <i className={'fas fa-trophy'} />
                <p>{'Current Rewards'}</p>
              </NavLink>
            </li>

            <li className={activeRoute('/employee/chat')}>
              <NavLink
                  to={'/employee/chat'}
                  className="nav-link"
                  activeClassName="active"
              >
                <i className={'fas fa-comment-dots'} />
                <p>{'Message'}</p>
              </NavLink>
            </li>

            <li className={activeRoute('/employee/help')}>
              <NavLink
                  to={'/employee/help'}
                  className="nav-link"
                  activeClassName="active"
              >
                <i className={'fa fa-question-circle'} />
                <p>{'Help'}</p>
              </NavLink>
            </li>

          </> : ''}

        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
