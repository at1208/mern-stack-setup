import { Link, withRouter } from 'react-router-dom';
import { isAuth, signout } from '../pages/auth/helpers';
import React, { Fragment } from 'react';
import { Button } from 'antd'

const Layout = ({ children, match, history }) => {
    const isActive = path => {
        if (match.path === path) {
            return { color: '#512da8', fontWeight:"bold" };
        } else {
            return { color: 'black' };
        }
    };

    const nav = () => (
        <ul className="container text-center pt-2">
              <Button ghost>
                <Link to="/" className="mr-2 ml-2" style={isActive('/')}>
                  Home
                </Link>
              </Button>

            {!isAuth() && (
                <Fragment>
                     <Button ghost>
                        <Link to="/signin" className="mr-2 ml-2" style={isActive('/signin')}>
                            Sign In
                        </Link>
                     </Button>

                     <Button   ghost>
                        <Link to="/signup" className="mr-2 ml-2" style={isActive('/signup')}>
                            Get started
                        </Link>
                     </Button>

                </Fragment>
            )}

            {isAuth() && isAuth().role === 'admin' && (
               <Button ghost>
                    <Link className="mr-2 ml-2" style={isActive('/admin')} to="/admin">
                      {isAuth().name}
                    </Link>
               </Button>
            )}

            {isAuth() && isAuth().role === 'subscriber' && (
                   <Button ghost>
                    <Link className="mr-2 ml-2" style={isActive('/private')} to="/private">
                      {isAuth().name}
                    </Link>
                  </Button>
            )}

            {isAuth() && (

                    <Button
                        className="mr-2 ml-2"
                        onClick={() => {
                            signout(() => {
                                history.push('/');
                            });
                        }}
                        type="primary"
                        danger
                    >
                        Sign out
                    </Button>

            )}
        </ul>
    );

    return (
        <Fragment>
            {nav()}
            <div className=" ">{children}</div>
        </Fragment>
    );
};

export default withRouter(Layout);
