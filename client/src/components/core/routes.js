import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Activate from '../pages/auth/activate/activate';
import PrivateRoute from '../pages/auth/privateRoute';
import AdminRoute from '../pages/auth/adminRoute';
import Forgot from '../pages/auth/forgot/forgot';
import Signup from '../pages/auth/signup/signup';
import Signin from '../pages/auth/signin/signin';
import Reset from '../pages/auth/reset/reset';
import Home from '../pages/home'
import Private from './private';
import Admin from './admin';
import React from 'react';


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
