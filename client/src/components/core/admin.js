import { isAuth, getCookie, signout, updateUser } from '../pages/auth/helpers';
import { ToastContainer, toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import Layout from './layout';
import { Button } from 'antd';
import axios from 'axios';



const Admin = ({ history }) => {
  const [values, setValues] = useState({
      role: '',
      name: '',
      email: '',
      password: '',
      buttonText: 'Submit'
  });

  const token = getCookie('token');

  useEffect(() => {
      loadProfile();
  }, []);

  const loadProfile = () => {
      axios({
          method: 'GET',
          url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
          headers: {
              Authorization: `Bearer ${token}`
          }
      })
          .then(response => {
              console.log('PRIVATE PROFILE UPDATE', response);
              const { role, name, email } = response.data;
              setValues({ ...values, role, name, email });
          })
          .catch(error => {
              console.log('PRIVATE PROFILE UPDATE ERROR', error.response.data.error);
              if (error.response.status === 401) {
                  signout(() => {
                      history.push('/');
                  });
              }
          });
  };

  const { role, name, email, password, buttonText } = values;

  const handleChange = name => event => {
      // console.log(event.target.value);
      setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = event => {
      event.preventDefault();
      setValues({ ...values, buttonText: 'Submitting' });
      axios({
          method: 'PUT',
          url: `${process.env.REACT_APP_API}/admin/update`,
          headers: {
              Authorization: `Bearer ${token}`
          },
          data: { name, password }
      })
          .then(response => {
              console.log('PRIVATE PROFILE UPDATE SUCCESS', response);
              updateUser(response, () => {
                  setValues({ ...values, buttonText: 'Submitted' });
                  toast.success('Profile updated successfully');
              });
          })
          .catch(error => {
              console.log('PRIVATE PROFILE UPDATE ERROR', error.response.data.error);
              setValues({ ...values, buttonText: 'Submit' });
              toast.error(error.response.data.error);
          });
  };
 
  const updateForm = () => (
      <form>
            <TextField id="role"
            variant="outlined"
            label="Role"
            fullWidth={true}
            value={role}
            className="mb-2 mt-2"
            size="small"
            disabled
            />

            <TextField id="name"
            label="Name"
            variant="outlined"
            fullWidth={true}
            onChange={handleChange('name')}
            value={name}
            className="mb-2 mt-2"
            size="small"
            />

            <TextField id="email"
            label="Email"
            variant="outlined"
            fullWidth={true}
            value={email}
            className="mb-2 mt-2"
            size="small"
            disabled
            />

            <TextField id="password"
            variant="outlined"
            label="Change password"
            fullWidth={true}
            className="mb-2 mt-2"
            size="small"
            type="password"
            onChange={handleChange('password')}
            value={password}
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
              <h1 className=" ">Admin</h1>
              <small className=" ">Profile Setting</small>
              {updateForm()}
          </div>
        </div>
      </div>
      </Layout>
  );
};

export default Admin;
