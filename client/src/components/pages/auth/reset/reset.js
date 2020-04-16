import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import Layout from '../../../core/layout';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './reset.css';
import { TextField } from '@material-ui/core';
import { Button } from 'antd';

const Reset = ({ match }) => {
    // props.match from react router dom
    const [values, setValues] = useState({
        name: '',
        token: '',
        newPassword: '',
        buttonText: 'Reset password'
    });

    useEffect(() => {
        let token = match.params.token;
        let { name } = jwt.decode(token);
        // console.log(name);
        if (token) {
            setValues({ ...values, name, token });
        }
    }, []);

    const { name, token, newPassword, buttonText } = values;

    const handleChange = event => {
        setValues({ ...values, newPassword: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'PUT',
            url: `http://localhost:8000/api/reset-password`,
            data: { newPassword, resetPasswordLink: token }
        })
            .then(response => {
                console.log('RESET PASSWORD SUCCESS', response);
                toast.success(response.data.message);
                setValues({ ...values, buttonText: 'Done' });
            })
            .catch(error => {
                console.log('RESET PASSWORD ERROR', error.response.data);
                toast.error(error.response.data.error);
                setValues({ ...values, buttonText: 'Reset password' });
            });
    };

    const passwordResetForm = () => (
        <form>
            <TextField id="Password"
                       label="Type new password"
                       variant="outlined"
                       onChange={handleChange}
                       value={newPassword}
                       type="password"
                       fullWidth={true}
                       className="mb-2"
                       size="small"
                       required
                       />
                <Button className="mb-3" onClick={clickSubmit} primary type="primary">
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
                <h1 className=" ">Hey {name} !!!</h1>
                {passwordResetForm()}
            </div>
          </div>
        </div>
        </Layout>
    );
};

export default Reset;
