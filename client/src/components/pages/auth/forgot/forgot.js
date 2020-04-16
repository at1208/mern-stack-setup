import { ToastContainer, toast } from 'react-toastify';
import { TextField } from '@material-ui/core';
import Layout from '../../../core/layout';
import React, { useState } from 'react';
import { Button } from 'antd';
import axios from 'axios';
import './forgot.css'



const Forgot = ({ history }) => {
    const [values, setValues] = useState({
        email: '',
        buttonText: 'Request password reset link'
    });

    const { email, buttonText } = values;

    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'PUT',
            url: `http://localhost:8000/api/forgot-password`,
            data: { email }
        })
            .then(response => {
                console.log('FORGOT PASSWORD SUCCESS', response);
                toast.success(response.data.message);
                setValues({ ...values, buttonText: 'Requested' });
            })
            .catch(error => {
                console.log('FORGOT PASSWORD ERROR', error.response.data);
                toast.error(error.response.data.error);
                setValues({ ...values, buttonText: 'Request password reset link' });
            });
    };

    const passwordForgotForm = () => (
        <form>
            <TextField id="Email"
                       label="Email"
                       variant="outlined"
                       onChange={handleChange('email')}
                       value={email}
                       fullWidth={true}
                       size="small"
                       className="mb-2 mt-2"
                       />

                <Button className="mb-3 mt-1" onClick={clickSubmit} type="primary" primary>
                    {buttonText}
                </Button>

        </form>
    );

    return (
        <Layout>
        <ToastContainer />
        <div className="container text-center mt-5">
          <div className='row col justify-content-center'>
             <div className='col-md-5 card pt-4'>
                <h1 className="forgot-title">Forgot password</h1>
                {passwordForgotForm()}
            </div>
          </div>
        </div>
        </Layout>
    );
};

export default Forgot;
