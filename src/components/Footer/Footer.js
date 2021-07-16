import React, {useState} from 'react';
import './Footer.css'
import NavigationItems from "../Navigation/NavigationItems/NavigationItems";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import formConfig from "../../helpers/formConfig";
import Logo from '../../assets/img/logo.png'
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import Spinner from "../UI/ProgressBar/ProgressBar";

const Footer = ( props ) => {
    const [email, setEmail] = useState("");
    const [queryForm, setQueryForm] = useState({
        name: formConfig('input', 'col-md-6','text', 'First Name'),
        email: formConfig('input', 'col-md-6','email', 'Email'),
        message: formConfig('textarea', 'col-md-12','text', 'message')
    })
    const [loader, setLoader] = useState(true)


    const notify = () => toast.success('Your Message has been successfully submitted'
        ,{
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });



    const inputChangeHandler = ( event, inputIdentifier ) => {
        const updatedQueryForm = {
            ...queryForm
        };
        const updatedFormElement = {
            ...updatedQueryForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedQueryForm[inputIdentifier] = updatedFormElement;
        setQueryForm(updatedQueryForm);
    }

    const queryHandler = (e) => {
        e.preventDefault();
        setLoader(false)
        const formData = {};
        for(let formElementIdentifier in queryForm) {
            formData[formElementIdentifier] = queryForm[formElementIdentifier].value;
        }
        axios.post('/query', formData)
            .then((res) => {
                setQueryForm({
                    name: formConfig('input', 'col-md-6','text', 'First Name'),
                    email: formConfig('input', 'col-md-6','email', 'Email'),
                    description: formConfig('textarea', 'col-md-12','text', 'description')
                })
                setLoader(true)
                notify()
            })
    }

    const formElementArray = [];
    for(let key in queryForm) {
        formElementArray.push({
            id: key,
            config: queryForm[key]
        })
    }

    const bottomInputChangeHandler = (event) => {
        setEmail(event.target.value)
    }
    let getInTouchForm = (
        <form onSubmit={queryHandler}>
            <div className="form-row">
                {formElementArray.map( formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        class={formElement.config.elementCol}
                        changed={(event) => inputChangeHandler(event, formElement.id)}
                        isValid={!formElement.config.valid}
                        touched={formElement.config.touched}
                    />
                ))}
                <div className="col-lg-12 text-center">
                    {loader ? <Button type="submit"
                                      buttonStyle={'btn-warning'}
                                      buttonSize={'btn-medium'}>
                        Submit
                    </Button> : <div className={'text-center'}>
                        <Spinner />
                    </div>}
                </div>
            </div>
        </form>
    )
    let bottomForm = (
        <form>
            <input className={'form-control'} type={'email'} placeholder={'Email'} onChange={bottomInputChangeHandler} value={email}/>
            <Button type="submit"
                    buttonStyle={'btn-warning'}
                    buttonSize={'btn-small'}>
                Submit
            </Button>
        </form>
    )
    return (
        <div className={'footer'}>
            <section className="section6">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 style={{color: '#013f84'}}>Get in Touch</h2>
                            {getInTouchForm}
                        </div>
                    </div>
                </div>
            </section>
            <section className={'section1'}>
                <div className="container">
                    <div className="row align-items-center text-center">
                        <div className="col-lg-2 col-md-3">
                            <img src={Logo} alt={'logo'}/>
                        </div>
                        <div className="col-lg-3 col-md-3 nav">
                            <NavigationItems showButton={false}/>
                        </div>
                        <div className="col-lg-3 col-md-3">
                            <ul className={'contactDetails'}>
                                <li><i className={'fa fa-address-card'} />Lorem Ipsum</li>
                                <li><i className={'fa fa-phone-alt'} />111-222-333</li>
                                <li><i className={'fa fa-envelope'} />info@demo.com</li>
                            </ul>
                        </div>
                        <div className="col-lg-4 col-md-3">
                            {bottomForm}
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
}

export default Footer;
