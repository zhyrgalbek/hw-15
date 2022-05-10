import React, { useState, useEffect, useReducer } from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
//debouncing, debounce




const emailReducer = (prevState, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.emailValue,
      isValid: action.emailValue.includes('@'),
    };
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: prevState.value,
      isValid: prevState.value.includes('@'),
    };
  }
  if(action.type === 'INPUT_PASSWORD'){
    return {
      ...prevState,
      enteredPassword: action.enteredPassword
    }
  }
  if(action.type === 'PASSWORD_BLUR'){
    return {
      ...prevState,
      passwordIsValid: prevState.enteredPassword.trim().length > 6
    }
  }
  return {
    value: '',
    isValid: false,
    enteredPassword: '',
    passwordIsValid: undefined,
  };
};



const Login = (props) => {
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    isValid: undefined,
    value: '',
    enteredPassword: '',
    passwordIsValid: undefined,
  });
  // const [enteredEmail, setEnteredEmail] = useState('text'); // write some email
  // const [emailIsValid, setEmailIsValid] = useState(); // check is email valid or not
  // const [enteredPassword, setEnteredPassword] = useState(''); // write some password
  // const [passwordIsValid, setPasswordIsValid] = useState(); // check is password valid or not
  const [formIsValid, setFormIsValid] = useState(false); // email and password are valid

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(emailState.value.includes('@') && emailState.enteredPassword.trim().length > 6);
    }, 3000);
    // clean up function
    return () => {
      clearTimeout(timer);
    };
  }, [emailState.value, emailState.enteredPassword]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: 'USER_INPUT', emailValue: event.target.value });
  };
  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchEmail({type: 'INPUT_PASSWORD', enteredPassword: event.target.value})
  };
  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes('@'));
    dispatchEmail({ type: 'INPUT_BLUR' });
  };
  const validatePasswordHandler = () => {
    // setPasswordIsValid(emailState.enteredPassword.trim().length > 6);
    dispatchEmail({type: 'PASSWORD_BLUR'})
  };
  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value ,emailState.enteredPassword);
  };
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''}`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div className={`${classes.control} ${emailState.passwordIsValid === false ? classes.invalid : ''}`}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={emailState.enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};
export default Login;