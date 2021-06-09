import React, {useState} from 'react';
import NavigationItem from "./NavigationItem/NavigationItem";
import {Button, Form, Modal} from "react-bootstrap";

import {useAuth} from "../../../context/AuthContext";
import {toast, ToastContainer} from "react-toastify";
import Spinner from "../../UI/ProgressBar/ProgressBar";


//gROpNls
const NavigationItems = ( props ) =>{
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loaded, setLoaded] = useState(true);
    const { login, logout } = useAuth();
    const loggedIn = localStorage.getItem('loggedIn')
    const data = {
        email,
        password
    }
    const errorNotify = (msg) => toast.error(msg===401 || msg===400 ? 'Invalid Email or Password' : '', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });

    const handleShow = () => setShow(!show);
    const onSubmitHandler = ( e ) => {
        e.preventDefault();
        setLoaded(false)
        login(data, errorNotify, setEmail, setPassword, setLoaded)
        setShow(false)

        // axios.post('/login', data)
        //     .then((res) => {
        //         console.log(res.data.token)
        //         setIsAuth(true)
        //         localStorage.setItem('user', res.data.token);
        //         if (res.data.token) {
        //             window.location.href = '/admin'
        //         }
        //     })
        //     .catch((err) => {
        //         window.location.reload()
        //         alert(err)
        //     })
    }
    const emailChangeHandler = (e) => {
        console.log(e.target.value)
        setEmail(e.target.value)
    }

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value)
    }


    const form = (
        <Form className="my-5" onSubmit={onSubmitHandler}>
            <Form.Group >
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" className="form-control" required placeholder="Enter Email/Username" onChange={(e) => emailChangeHandler(e)} value={email} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" className="form-control" required placeholder="Enter Password" onChange={(e) => passwordChangeHandler(e)} value={password}  />
            </Form.Group>
            <Button type={'submit'} href="" variant={'primary'} size={'lg'}>Login</Button>
        </Form>
    )
    return(
       <>
           <ul className={'nav navbar-nav align-items-center ml-auto'}>
               <ToastContainer
                   position="top-center"
                   autoClose={2000}
                   hideProgressBar={false}
                   newestOnTop={false}
                   closeOnClick
                   rtl={false}
                   pauseOnFocusLoss={false}
                   draggable
                   pauseOnHover
               />
               <NavigationItem link={'/'} exact>Home</NavigationItem>
               <NavigationItem link={'/about'} >About Us</NavigationItem>
               <NavigationItem link={'/career'} >Career</NavigationItem>
               <NavigationItem link={'/contact'}>Contact</NavigationItem>
               {(loggedIn === 'true') ? <NavigationItem link={'/applicationStatus'}>Application Status</NavigationItem> : ''}
               {(loggedIn !== 'true') ? loaded ? <button onClick={handleShow} className={'btn btn-lg btn-warning'} >Sign In</button> : <Spinner /> : <button onClick={() => logout(setEmail, setPassword)} className={'btn btn-lg btn-warning'} >Sign Out</button>}

           </ul>

           <Modal
               show={show}
               onHide={handleShow}
               animation={false}
               size={'md'}
               centered
           >
               <Modal.Header closeButton>
                   <Modal.Title>Login</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                   {form}
               </Modal.Body>
           </Modal>
       </>
    );
}



export default NavigationItems;
