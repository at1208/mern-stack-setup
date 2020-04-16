import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from '../pages/home'
import Signup from '../pages/auth/signup';
import Signin from '../pages/auth/signin';
import Activate from '../pages/auth/activate';
import Private from './private';
import Admin from './admin';
import PrivateRoute from '../pages/auth/privateRoute';
import AdminRoute from '../pages/auth/adminRoute';
import Forgot from '../pages/auth/forgot';
import Reset from '../pages/auth/reset';

const Routes = () => {
  return (
     <BrowserRouter>
       <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/signin' exact component={Signin} />
          <Route path='/signup' exact component={Signup} />
          <Route path="/auth/activate/:token" exact component={Activate} />
          <PrivateRoute path="/private" exact component={Private} />
          <AdminRoute path="/admin" exact component={Admin} />
          <Route path="/auth/password/forgot" exact component={Forgot} />
          <Route path="/auth/password/reset/:token" exact component={Reset} />
       </Switch>
     </BrowserRouter>
  )
}

export default Routes;
