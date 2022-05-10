import React, { useState, useEffect, useReducer } from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
//debouncing, debounce




const emailReducer = (prevState, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.emailValue,
    };
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      ...prevState,
      isValid: prevState.value.includes('@'),
    };
  }
  return {
    value: '',
    isValid: false,
  };
};

function passwordReducer(prevState, action){
  if(action.type === 'INPUT_PASSWORD'){
    return {
      ...prevState,
      value: action.value
    }
  }
  if(action.type === 'PASSWORD_BLUR'){
    return {
      ...prevState,
      isValid: prevState.value.trim().length > 6,
    }
  }
  return {
    value: '',
    isValid: false,
  }
}


const Login = (props) => {
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    isValid: undefined,
    value: '',
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: undefined,
  })

  
  const [formIsValid, setFormIsValid] = useState(false); // email and password are valid

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(emailState.value.includes('@') && passwordState.value.trim().length > 6);
    }, 3000);
    // clean up function
    return () => {
      clearTimeout(timer);
    };
  }, [emailState.value, passwordState.value]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', emailValue: event.target.value });
  };
  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'INPUT_PASSWORD', value: event.target.value})
  };
  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'PASSWORD_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value , passwordState.value);
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
        <div className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ''}`}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
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