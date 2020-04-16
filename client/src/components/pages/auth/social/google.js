import React from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { Button } from 'antd';
import { FaGoogle } from "react-icons/fa";
import './social.css'

const Google = ({ informParent = f => f }) => {
    const responseGoogle = response => {
        console.log(response.tokenId);
        axios({
            method: 'POST',
            url: `http://localhost:8000/api/google-login`,
            data: { idToken: response.tokenId }
        })
            .then(response => {
                console.log('GOOGLE SIGNIN SUCCESS', response);
                // inform parent component
                informParent(response);
            })
            .catch(error => {
                console.log('GOOGLE SIGNIN ERROR', error.response);
            });
    };
    return (
            <GoogleLogin
                clientId={`384115946551-cohmqe9rrp9pnl5uf4jihvfpo99q7jbn.apps.googleusercontent.com`}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                render={renderProps => (
                    <Button
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        block
                        type="link"
                    >
                    <FaGoogle className='google-logo float-left'/><span className="google-text">Login with Google</span>
                    </Button>
                )}
                cookiePolicy={'single_host_origin'}
            />
    );
};

export default Google;
