  import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../../../core/layout';
import axios from 'axios';
import { isAuth } from '../helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './signup.css'
import { TextField } from '@material-ui/core';
import { Button } from 'antd';

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        buttonText: 'Submit'
    });

    const { name, email, password, buttonText } = values;

    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'POST',
            url: `http://localhost:8000/api/signup`,
            data: { name, email, password }
        })
            .then(response => {
                console.log('SIGNUP SUCCESS', response);
                setValues({ ...values, name: '', email: '', password: '', buttonText: 'Submitted' });
                toast.success(response.data.message);
            })
            .catch(error => {
                console.log('SIGNUP ERROR', error.response.data);
                setValues({ ...values, buttonText: 'Submit' });
                toast.error(error.response.data.error);
            });
    };

    const signupForm = () => (
        <form>

            <TextField id="Name"
                       label="Enter name"
                       variant="outlined"
                       onChange={handleChange('name')}
                       value={name}
                       fullWidth={true}
                       className="mb-2 mt-2"
                       size="small"
                       />


           <TextField id="Email"
                      label="Enter email"
                      variant="outlined"
                      onChange={handleChange('email')}
                      value={email}
                      fullWidth={true}
                      className="mb-2 mt-1"
                      size="small"
                      />



          <TextField id="Password"
                     label="Enter password"
                     variant="outlined"
                     onChange={handleChange('password')}
                     value={password}
                     type="password"
                     fullWidth={true}
                     className="mb-2 mt-1"
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
               <h1 className="get-started-title">Create an account</h1>
                {signupForm()}
                <Link to="/auth/password/forgot" className="forgot ml-2 mb-2">
                    Forgot Password
                </Link>
            </div>
          </div>
        </div>
        </Layout>
    );
};

export default Signup;
