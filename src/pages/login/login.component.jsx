import React, { useContext } from 'react';
import API from '../../utils/api';

import useFormInput from '../../effects/use-form-input.effect';

import { UserContext } from '../../providers/user/user.provider';

import './login.styles.scss';

const LoginPage = () => {
  const email = useFormInput('');
  const password = useFormInput('');
  const { setCurrentUser } = useContext(UserContext);

  const handleSubmit = event => {
    event.preventDefault();

    API.post('auth/login', {
      email: email.value,
      password: password.value
    }).then(res => {
      setCurrentUser({
        ...res.data.user,
        accessToken: res.data.token.accessToken
      });
      localStorage.setItem('user', res.data.token.accessToken);
    });
  };

  return (
    <div className="login-container">
      <form className="form-signin" onSubmit={handleSubmit}>
        <img
          className="mb-4"
          src="https://getbootstrap.com/docs/4.4/assets/brand/bootstrap-solid.svg"
          alt=""
          width="72"
          height="72"
        />
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label htmlFor="inputEmail" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          name="email"
          {...email}
          required
          autoFocus
        />
        <label htmlFor="inputPassword" className="sr-only">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          name="password"
          {...password}
          required
        />
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Sign in
        </button>
        <p className="mt-5 mb-3 text-muted">&copy; 2017-2019</p>
      </form>
    </div>
  );
};

export default LoginPage;
