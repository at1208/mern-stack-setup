import { ToastContainer, toast } from 'react-toastify';
import { Link, Redirect } from 'react-router-dom';
import { authenticate, isAuth } from '../helpers';
import { TextField } from '@material-ui/core';
import Facebook from '../social/facebook';
import Layout from '../../../core/layout';
import React, { useState } from 'react';
import Google from '../social/google';
import { Button } from 'antd';
import axios from 'axios';
import './signin.css';



const Signin = ({ history }) => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        buttonText: 'Submit'
    });

    const { email, password, buttonText } = values;

    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
    };

    const informParent = response => {
        authenticate(response, () => {
            isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private');
        });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'POST',
            url: `http://localhost:8000/api/signin`,
            data: { email, password }
        })
            .then(response => {
                console.log('SIGNIN SUCCESS', response);
                // save the response (user, token) localstorage/cookie
                authenticate(response, () => {
                    setValues({ ...values, name: '', email: '', password: '', buttonText: 'Submitted' });
                    // toast.success(`Hey ${response.data.user.name}, Welcome back!`);
                    isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private');
                });
            })
            .catch(error => {
                console.log('SIGNIN ERROR', error.response.data);
                setValues({ ...values, buttonText: 'Submit' });
                toast.error(error.response.data.error);
            });
    };

    const signinForm = () => (
        <form>

            <TextField id="Email"
                       label="Email"
                       variant="outlined"
                       onChange={handleChange('email')}
                       value={email}
                       fullWidth={true}
                       className="mb-2 mt-2"
                       size="small"
                       />

            <TextField id="Password"
                       label="Password"
                       variant="outlined"
                       onChange={handleChange('password')}
                       value={password}
                       type="password"
                       fullWidth={true}
                       className="mb-2"
                       size="small"
                       />

                <Button className=" " onClick={clickSubmit} primary type="primary">
                    {buttonText}
                </Button>
        </form>
    );

    return (
        <Layout>
          <ToastContainer />
          {isAuth() ? <Redirect to="/" /> : null}

            <div className="container text-center mt-5">
              <div className='row col justify-content-center'>
                 <div className='col-md-5 card pt-4'>
                   <h1 className="signin-title">Sign In</h1>
                    <div className='row col justify-content-center pb-4'>
                       <div className='col-md-6'>
                         <Google informParent={informParent} />
                       </div>
                       <div className='col-md-6'>
                         <Facebook informParent={informParent} />
                       </div>
                    </div>

                {signinForm()}

                <Link to="/auth/password/forgot" className="forgot ml-2 mb-2">
                    Forgot Password
                </Link>
             </div>
             </div>
            </div>
        </Layout>
    );
};

export default Signin;
