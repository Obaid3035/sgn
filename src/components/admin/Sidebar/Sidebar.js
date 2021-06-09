import React  from "react";
import { useLocation,NavLink } from "react-router-dom";
import Logo from '../../../assets/img/logo.png'
import font from '@fortawesome/fontawesome-free'

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
          <a className="simple-text text-center" href="http://www.creative-tim.com">
            SGN
          </a>
        </div>
        <Nav>
          {user.role.includes('admin') ? (
              <>
                <li className={activeRoute('/admin/dashboard')}>
                  <NavLink
                      to={'/admin/dashboard'}
                      className="nav-link"
                      activeClassName="active"
                  >
                    <i className={'fa fa-home'} />
                    <p>{'Dashboard'}</p>
                  </NavLink>
                </li>

                <li className={activeRoute('/admin/subAdmin')}>
                  <NavLink
                      to={'/admin/subAdmin'}
                      className="nav-link"
                      activeClassName="active"
                  >
                    <i className={'fas fa-user-tie'} />
                    <p>{'Sub Admin'}</p>
                  </NavLink>
                </li>
                <li className={activeRoute('/admin/employee')}>
                  <NavLink
                      to={'/admin/employee'}
                      className="nav-link"
                      activeClassName="active"
                  >
                    <i className={'fas fa-users'} />
                    <p>{'Employee'}</p>
                  </NavLink>
                </li>

                <li className={activeRoute('/admin/job')}>
                  <NavLink
                      to={'/admin/job'}
                      className="nav-link"
                      activeClassName="active"
                  >
                    <i className={'fas fa-briefcase'} />
                    <p>{'Job'}</p>
                  </NavLink>
                </li>

                <li className={activeRoute('/admin/application')}>
                  <NavLink
                      to={'/admin/application'}
                      className="nav-link"
                      activeClassName="active"
                  >
                    <i className={'fas fa-clipboard-list'} />
                    <p>{'Application'}</p>
                  </NavLink>
                </li>

                <li className={activeRoute('/admin/project')}>
                  <NavLink
                      to={'/admin/project'}
                      className="nav-link"
                      activeClassName="active"
                  >
                    <i className={'fas fa-project-diagram'} />
                    <p>{'Project'}</p>
                  </NavLink>
                </li>
                <li className={activeRoute('/admin/noticeofintent')}>
                  <NavLink
                      to={'/admin/noticeofintent'}
                      className="nav-link"
                      activeClassName="active"
                  >
                    <i className={'fas fa-clipboard-check'} />
                    <p>{'Notice Of Intent'}</p>
                  </NavLink>
                </li>

                <li className={activeRoute('/admin/todoList')}>
                  <NavLink
                      to={'/admin/todoList'}
                      className="nav-link"
                      activeClassName="active"
                  >
                    <i className={'fas fa-list'} />
                    <p>{'Todo List'}</p>
                  </NavLink>
                </li>

                <li className={activeRoute('/admin/payment')}>
                  <NavLink
                      to={'/admin/payment'}
                      className="nav-link"
                      activeClassName="active"
                  >
                    <i className={'fa fa-credit-card'} />
                    <p>{'Payment'}</p>
                  </NavLink>
                </li>
                <li className={activeRoute('/admin/benefit')}>
                  <NavLink
                      to={'/admin/benefit'}
                      className="nav-link"
                      activeClassName="active"
                  >
                    <i className={'fa fa-magic'} />
                    <p>{'Benefit'}</p>
                  </NavLink>
                </li>
                <li className={activeRoute('/admin/reward')}>
                  <NavLink
                      to={'/admin/reward'}
                      className="nav-link"
                      activeClassName="active"
                  >
                    <i className={'fas fa-trophy'} />
                    <p>{'Reward'}</p>
                  </NavLink>
                </li>
                <li className={activeRoute('/admin/chat')}>
                  <NavLink
                      to={'/admin/chat'}
                      className="nav-link"
                      activeClassName="active"
                  >
                    <i className={'fas fa-comment-dots'} />
                    <p>{'Message'}</p>
                  </NavLink>
                </li>
                <li className={activeRoute('/admin/report')}>
                  <NavLink
                      to={'/admin/report'}
                      className="nav-link"
                      activeClassName="active"
                  >
                    <i className={'fas fa-receipt'} />
                    <p>{'Report'}</p>
                  </NavLink>
                </li>
                <li className={activeRoute('/admin/quote')}>
                  <NavLink
                      to={'/admin/quote'}
                      className="nav-link"
                      activeClassName="active"
                  >
                    <i className={'fas fa-question-circle'} />
                    <p>{'Quote'}</p>
                  </NavLink>
                </li>
              </>
          ) : ''}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
