import React, { useReducer, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { useRegister } from '../hooks/useRegister';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`,
    },
    registerBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
    },
    header: {
      textAlign: 'center',
      background: '#212121',
      color: '#fff',
    },
    card: {
      marginTop: theme.spacing(10),
    },
    business: {
      display: 'flex',
      alignItems: 'center',
      fontSize: 20,
      marginBottom: 5,
    },
  })
);

type State = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  age: number;
  isButtonDisabled: boolean;
  helperText: string;
  isError: boolean;
  isBusiness: boolean;
};

const initialState: State = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
  age: 0,
  isButtonDisabled: true,
  helperText: '',
  isError: false,
  isBusiness: false,
};

type Action =
  | { type: 'setFirstName'; payload: string }
  | { type: 'setLastName'; payload: string }
  | { type: 'setEmail'; payload: string }
  | { type: 'setUsername'; payload: string }
  | { type: 'setPassword'; payload: string }
  | { type: 'setAge'; payload: number }
  | { type: 'setBusiness'; payload: boolean }
  | { type: 'setIsButtonDisabled'; payload: boolean }
  | { type: 'registerSuccess'; payload: string }
  | { type: 'registerFailed'; payload: string }
  | { type: 'setIsError'; payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setFirstName':
      return {
        ...state,
        firstName: action.payload,
      };
    case 'setLastName':
      return {
        ...state,
        lastName: action.payload,
      };
    case 'setEmail':
      return {
        ...state,
        email: action.payload,
      };
    case 'setUsername':
      return {
        ...state,
        username: action.payload,
      };
    case 'setPassword':
      return {
        ...state,
        password: action.payload,
      };
    case 'setAge':
      return {
        ...state,
        age: action.payload,
      };
    case 'setBusiness':
      return { ...state, isBusiness: action.payload };
    case 'setIsButtonDisabled':
      return {
        ...state,
        isButtonDisabled: action.payload,
      };
    case 'registerSuccess':
      return {
        ...state,
        helperText: action.payload,
        isError: false,
      };
    case 'registerFailed':
      return {
        ...state,
        helperText: action.payload,
        isError: true,
      };
    case 'setIsError':
      return {
        ...state,
        isError: action.payload,
      };
  }
};

const RegisterPage = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);

  const register = useRegister();

  useEffect(() => {
    if (
      state.firstName.trim() &&
      state.lastName.trim() &&
      state.email.trim() &&
      state.username.trim() &&
      state.password.trim() &&
      state.age
    ) {
      dispatch({
        type: 'setIsButtonDisabled',
        payload: false,
      });
    } else {
      dispatch({
        type: 'setIsButtonDisabled',
        payload: true,
      });
    }
  }, [
    state.firstName,
    state.lastName,
    state.email,
    state.username,
    state.password,
    state.age,
  ]);

  const handleRegister = () => {
    register.mutate(state);
  };

  const handleKeypress = (event: React.KeyboardEvent) => {
    if (
      (event.keyCode === 13 || event.which === 13) &&
      !state.isButtonDisabled
    ) {
      handleRegister();
    }
  };

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: 'setFirstName',
      payload: event.target.value,
    });
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'setLastName',
      payload: event.target.value,
    });
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'setEmail',
      payload: event.target.value,
    });
  };

  const handleBusinessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'setBusiness',
      payload: event.target.checked,
    });
  };

  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'setUsername',
      payload: event.target.value,
    });
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'setPassword',
      payload: event.target.value,
    });
  };

  const handleAge = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'setAge',
      payload: parseInt(event.target.value),
    });
  };

  return (
    <form className={classes.container} noValidate autoComplete='off'>
      <Card className={classes.card}>
        <CardHeader className={classes.header} title='Inregistrare' />
        <CardContent>
          <div>
            <TextField
              error={state.isError}
              fullWidth
              id='firstName'
              type='text'
              label='First name'
              placeholder='FirstName'
              margin='normal'
              onChange={handleFirstNameChange}
              onKeyPress={handleKeypress}
            />
            <TextField
              error={state.isError}
              fullWidth
              id='lastName'
              type='text'
              label='Last name'
              placeholder='LastName'
              margin='normal'
              onChange={handleLastNameChange}
              onKeyPress={handleKeypress}
            />
            <TextField
              error={state.isError}
              fullWidth
              id='email'
              type='email'
              label='Email'
              placeholder='Email'
              margin='normal'
              onChange={handleEmailChange}
              onKeyPress={handleKeypress}
            />
            <TextField
              error={state.isError}
              fullWidth
              id='username'
              type='text'
              label='Username'
              placeholder='Username'
              margin='normal'
              onChange={handleUsername}
              onKeyPress={handleKeypress}
            />
            <TextField
              error={state.isError}
              fullWidth
              id='password'
              type='password'
              label='Password'
              placeholder='Password'
              margin='normal'
              onChange={handlePassword}
              onKeyPress={handleKeypress}
            />
            <TextField
              error={state.isError}
              fullWidth
              id='age'
              InputProps={{ inputProps: { min: 10, max: 120 } }}
              type='number'
              label='Age'
              placeholder='Age'
              margin='normal'
              onChange={handleAge}
              onKeyPress={handleKeypress}
              helperText={state.helperText}
            />
            <div className={classes.business}>
              <span>Detineti un business?</span>
              <Checkbox
                color='primary'
                checked={state.isBusiness}
                onChange={handleBusinessChange}
              />
            </div>
            <Link to='/login'>Aveti deja un cont?</Link>
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant='contained'
            size='large'
            color='secondary'
            className={classes.registerBtn}
            onClick={handleRegister}
            disabled={state.isButtonDisabled}
          >
            Inregistrare
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default RegisterPage;
