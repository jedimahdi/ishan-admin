import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from './providers/user/user.provider';

import './index.css';
import App from './App';

ReactDOM.render(
  <UserProvider>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <App />
    </BrowserRouter>
  </UserProvider>,
  document.getElementById('root')
);
