import React, { useEffect, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import moment from 'jalali-moment';

import apiAuth from './utils/api_auth';

import { UserContext } from './providers/user/user.provider';

import './App.css';

import AdminPage from './pages/admin_page/admin_page.component';
import LoginPage from './pages/login/login.component';

// import requireAuth from './components/middlewares/require_auth';
// import noRequireAuth from './components/middlewares/no_require_auth';

function App() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  moment.locale('fa', { useGregorianParser: true });

  useEffect(() => {
    if (!currentUser && localStorage.getItem('user')) {
      apiAuth
        .get('users/profile')
        .then(res => {
          setCurrentUser({
            ...res.data,
            accessToken: localStorage.getItem('user')
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [currentUser, setCurrentUser]);

  if (currentUser) {
    return (
      <div>
        <Switch>
          {/* <Route exact path="/login" component={LoginPage} /> */}
          <Route path="/" component={AdminPage} />
        </Switch>
      </div>
    );
  } else {
    return (
      <div>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          {/* <Route path="/" component={AdminPage} /> */}
        </Switch>
      </div>
    );
  }
}

export default App;
