import React, { useState } from 'react';
import * as EmailValidator from 'email-validator';
import { passwordStrength } from 'check-password-strength';

const App = () => {
  const initialState = {
    username: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    usernameIsValid: true,
    passwordIsValid: true,
    passwordStrength: {
      color: '',
      value: '',
    },
    passwordIsMatching: true,
  };
  const [state, setState] = useState(initialState);

  let validInput =
    state.password &&
    state.username &&
    state.usernameIsValid &&
    state.passwordIsValid &&
    ['Strong', 'Medium'].includes(state.passwordStrength.value) &&
    (state.password === state.confirmPassword || state.showPassword);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const passwordStrengthChecked = passwordStrength(value).value;

    let color = '';
    switch (passwordStrengthChecked) {
      case 'Too weak':
        color = 'red';
        break;
      case 'Weak':
        color = 'orange';
        break;
      default:
        color = 'green';
    }

    setState((prevState) => ({
      ...prevState,
      [name]: value,
      passwordStrength: {
        value: passwordStrengthChecked,
        color: color,
      },
    }));
  };

  const validateEmail = (e) => {
    setState((prevState) => ({
      ...prevState,
      usernameIsValid: EmailValidator.validate(e.target.value),
    }));
  };

  const validatePassword = (e) => {
    setState((prevState) => ({
      ...prevState,
      passwordIsValid: e.target.value.length >= 8,
    }));
  };

  const validatePasswordMatching = (e) => {
    setState((prevState) => ({
      ...prevState,
      passwordIsMatching: e.target.value === state.password,
    }));
  };

  const handleShowPassword = () => {
    setState((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  };

  return (
    <div id="app" className="container">
      <form id="my-form" className="shadow">
        <h4>Form Validator</h4>

        <div className="mb-4">
          <label>Username</label>
          <input
            className="form-control"
            type="text"
            name="username"
            placeholder="Enter Email"
            value={state.username}
            onChange={handleInputChange}
            onBlur={validateEmail}
          />
          {!state.usernameIsValid && (
            <p className="validator-err">Please enter a valid email</p>
          )}
        </div>

        <div className="mb-4">
          <label>Password</label>
          <input
            className="form-control"
            type={state.showPassword ? 'text' : 'password'}
            name="password"
            value={state.password}
            onChange={handleInputChange}
            onBlur={validatePassword}
          />
          {!state.passwordIsValid && (
            <p className="validator-err">
              Password should be more than 8 characters
            </p>
          )}
          {state.password && (
            <p
              className="show-password-msg"
              onClick={handleShowPassword}
              style={{
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              {state.showPassword ? 'Hide Password' : 'Show Password'}
            </p>
          )}
        </div>

        {!state.showPassword && (
          <div className="mb-4">
            <label>Password Confirm</label>
            <input
              className="form-control"
              type="password"
              name="confirmPassword"
              value={state.confirmPassword}
              onChange={handleInputChange}
              onBlur={validatePasswordMatching}
            />
            {!state.passwordIsMatching && (
              <p className="validator-err">Password is not matching.</p>
            )}
          </div>
        )}
        {state.password && (
          <div style={{ color: state.passwordStrength.color }}>
            {state.passwordStrength.value}
          </div>
        )}
        <button
          disabled={!validInput}
          style={{
            backgroundColor: validInput ? '#198754' : 'grey',
          }}
          onClick={() => {
            alert('Your form has been validated !');
            setState(initialState);
          }}
          type="button"
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default App;
