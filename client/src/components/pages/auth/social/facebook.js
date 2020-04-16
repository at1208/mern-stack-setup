import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { FaFacebookSquare } from "react-icons/fa";
import { Button } from 'antd'
import React from 'react';
import axios from 'axios';
import './social.css'

const Facebook = ({ informParent = f => f }) => {
    const responseFacebook = response => {
        console.log(response);
        axios({
            method: 'POST',
            url: `http://localhost:8000/api/facebook-login`,
            data: { userID: response.userID, accessToken: response.accessToken }
        })
            .then(response => {
                console.log('FACEBOOK SIGNIN SUCCESS', response);
                // inform parent component
                informParent(response);
            })
            .catch(error => {
                console.log('FACEBOOK SIGNIN ERROR', error.response);
            });
    };
    return (
            <FacebookLogin
                appId={`154959638896320`}
                autoLoad={false}
                callback={responseFacebook}
                render={renderProps => (
                    <Button
                     onClick={renderProps.onClick}
                     block
                     type="link"
                    >
                      <FaFacebookSquare className='facebook-logo float-left'/> <span  className="fb-text">Login with Facebook</span>
                    </Button>
                )}
            />
    );
};

export default Facebook;
