import React, { useReducer, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { CardMedia, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { LocationDetailsPageProps } from './AccommodationPage';
import { useAddBooking } from '../hooks/useAddBooking';

type State = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  helperText: string;
  isButtonDisabled: boolean;
  hasError: boolean;
  openSnackbar: boolean;
};

const initialState: State = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  isButtonDisabled: true,
  helperText: '',
  hasError: false,
  openSnackbar: false,
};

type Action =
  | { type: 'setFirstName'; payload: string }
  | { type: 'setLastName'; payload: string }
  | { type: 'setEmail'; payload: string }
  | { type: 'setPhoneNumber'; payload: string }
  | { type: 'bookingSuccess'; payload: string }
  | { type: 'bookingFailed'; payload: string }
  | { type: 'setHasError'; payload: boolean }
  | { type: 'setIsButtonDisabled'; payload: boolean }
  | { type: 'setOpenSnackbar'; payload: boolean };

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
    case 'setPhoneNumber':
      return {
        ...state,
        phoneNumber: action.payload,
      };
    case 'bookingSuccess':
      return {
        ...state,
        helperText: action.payload,
        hasError: false,
      };
    case 'bookingFailed':
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
    case 'setIsButtonDisabled':
      return {
        ...state,
        isButtonDisabled: action.payload,
      };
    case 'setOpenSnackbar':
      return {
        ...state,
        openSnackbar: action.payload,
      };
  }
};

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      height: '90vh',
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageCard: {
      width: '90%',
      height: '80%',
      boxShadow: '5px 5px 18px -1px rgba(0,0,0,0.82)',
      position: 'relative',
    },
    card: {
      height: '100%',
      flexDirection: 'column',
      width: '80%',

      display: 'flex',
    },
    media: {
      width: '100%',
      height: '100%',
    },
    container: {
      zIndex: 2,
      width: '50%',
      height: '55',
      display: 'flex',
      position: 'absolute',
      top: 100,
      left: 100,
      opacity: 0.9,
      textAlign: 'center',
    },
    bookingBtn: {
      display: 'flex',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '50%',
    },
    header: {
      textAlign: 'center',
      background: '#212121',
      color: '#fff',
    },
    payment: {
      display: 'flex',
      marginLeft: 20,
      fontSize: 18,
      alignItems: 'center',
    },
    snackbar: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  });
});

const BookingPage = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);

  const { id } = useParams<LocationDetailsPageProps>();
  const location = useLocation();
  const addBooking = useAddBooking();
  const history = useHistory();

  const urlParams = new URLSearchParams(location.search);

  useEffect(() => {
    if (
      state.firstName.trim() &&
      state.lastName.trim() &&
      state.email.trim() &&
      state.phoneNumber.trim()
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
  }, [state.firstName, state.lastName, state.email, state.phoneNumber]);

  const handleBooking = async () => {
    try {
      await addBooking.mutateAsync({
        id: id || '',
        ...state,
        startDate: urlParams.get('startDate') || '',
        endDate: urlParams.get('endDate') || '',
      });
      dispatch({
        type: 'bookingSuccess',
        payload: 'bookedSuccessfully',
      });
      dispatch({
        type: 'setOpenSnackbar',
        payload: true,
      });
      history.push('/');
    } catch (error) {
      dispatch({
        type: 'bookingFailed',
        payload: error.response.data.error,
      });
    }
  };

  const handleKeypress = (event: React.KeyboardEvent) => {
    if (
      (event.keyCode === 13 || event.which === 13) &&
      !state.isButtonDisabled
    ) {
      handleBooking();
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

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: 'setPhoneNumber',
      payload: event.target.value,
    });
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch({
      type: 'setOpenSnackbar',
      payload: false,
    });
  };

  return (
    <div className={classes.root}>
      <Card className={classes.imageCard}>
        <CardMedia
          className={classes.media}
          image={
            'https://recruit4languages.com/app/uploads/2019/09/shu-Romania-Transylvania-Peles-494393290-1440x823.jpg'
          }
        />
        <form className={classes.container} noValidate autoComplete='off'>
          <Card className={classes.card}>
            <CardHeader className={classes.header} title='Date de contact' />
            <CardContent>
              <div>
                <TextField
                  error={state.hasError}
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
                  error={state.hasError}
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
                  error={state.hasError}
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
                  error={state.hasError}
                  fullWidth
                  id='phoneNumber'
                  type='text'
                  label='Phone number'
                  placeholder='phoneNumber'
                  margin='normal'
                  onChange={handlePhoneNumberChange}
                  onKeyPress={handleKeypress}
                  helperText={state.helperText}
                />
              </div>
            </CardContent>
            <CardActions>
              <Button
                className={classes.bookingBtn}
                variant='contained'
                size='large'
                color='secondary'
                onClick={handleBooking}
                disabled={state.isButtonDisabled}
              >
                Rezerva
              </Button>
            </CardActions>
            <Snackbar
              open={state.openSnackbar}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert onClose={handleClose} severity='success'>
                Ati rezervat locatia! Vacanta placuta!
              </Alert>
            </Snackbar>
          </Card>
        </form>
      </Card>
    </div>
  );
};

export default BookingPage;
