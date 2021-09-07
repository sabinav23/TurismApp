import React, { useReducer, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { useLogin } from '../hooks/useLogin';
import { Link } from 'react-router-dom';

type State = {
  username: string;
  password: string;
  isButtonPushed: boolean;
  helperText: string;
  hasError: boolean;
};

type Action =
  | { type: 'setUsername'; payload: string }
  | { type: 'setPassword'; payload: string }
  | { type: 'setIsButtonPushed'; payload: boolean }
  | { type: 'loginSuccess'; payload: string }
  | { type: 'loginFailed'; payload: string }
  | { type: 'setHasError'; payload: boolean };

const initialState: State = {
  username: '',
  password: '',
  isButtonPushed: false,
  helperText: '',
  hasError: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
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
    case 'setIsButtonPushed':
      return {
        ...state,
        isButtonPushed: action.payload,
      };
    case 'loginSuccess':
      return {
        ...state,
        helperText: action.payload,
        hasError: false,
      };
    case 'loginFailed':
      return {
        ...state,
        helperText: action.payload,
        hasError: true,
      };
    case 'setHasError':
      return {
        ...state,
        hasError: action.payload,
      };
  }
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`,
    },
    loginBtn: {
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
  })
);

const LoginPage = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = useLogin();

  useEffect(() => {
    if (state.username.trim() && state.password.trim()) {
      dispatch({
        type: 'setIsButtonPushed',
        payload: false,
      });
    } else {
      dispatch({
        type: 'setIsButtonPushed',
        payload: true,
      });
    }
  }, [state.username, state.password]);

  const handleLogin = () => {
    login.mutate(state);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if ((event.keyCode === 13 || event.which === 13) && !state.isButtonPushed) {
      handleLogin();
    }
  };

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: 'setUsername',
      payload: event.target.value,
    });
  };

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: 'setPassword',
      payload: event.target.value,
    });
  };

  return (
    <form className={classes.container} noValidate autoComplete='off'>
      <Card className={classes.card}>
        <CardHeader className={classes.header} title='Autentificare' />
        <CardContent>
          <div>
            <TextField
              error={state.hasError}
              fullWidth
              id='username'
              type='text'
              label='Nume utilizator'
              placeholder='Nume utilizator'
              margin='normal'
              onChange={handleUsernameChange}
              onKeyPress={handleKeyPress}
            />
            <TextField
              error={state.hasError}
              fullWidth
              id='password'
              type='password'
              label='Parola'
              placeholder='Parola'
              margin='normal'
              helperText={state.helperText}
              onChange={handlePasswordChange}
              onKeyPress={handleKeyPress}
            />
            <Link to='/register'>Aveti nevoie de un cont?</Link>
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant='contained'
            size='large'
            color='secondary'
            className={classes.loginBtn}
            onClick={handleLogin}
            disabled={state.isButtonPushed}
          >
            Autentificare
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default LoginPage;
