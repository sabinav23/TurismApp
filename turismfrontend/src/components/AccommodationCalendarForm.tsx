import React, { useState, useContext } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import { useCheckAvailability } from '../hooks/useCheckAvailability';
import { useHistory } from 'react-router';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { AuthContext } from '../App';

interface AccommodationCalendarFormProps {
  locationId: string | undefined;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      width: '50%',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    formContainer: {
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
    },
    dateContainer: {
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
    },
    searchBtn: {
      marginBottom: 8,
    },
  })
);

function AccommodationCalendarForm({
  locationId,
}: AccommodationCalendarFormProps) {
  const classes = useStyles();
  const checkAvailability = useCheckAvailability();
  const history = useHistory();
  const { isLoggedIn } = useContext(AuthContext);

  const today = new Date();

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [startDate, setStartDate] = React.useState<Date | null>(today);
  const [endDate, setEndDate] = React.useState<Date | null>(today);

  const onCheckAvailability = async () => {
    if (!isLoggedIn) {
      return history.push('/login');
    }

    try {
      await checkAvailability.mutateAsync({
        id: locationId || '',
        startDate: startDate?.toISOString() || '',
        endDate: endDate?.toISOString() || '',
      });
      history.push(
        `/booking/${locationId}?startDate=${encodeURIComponent(
          startDate?.toISOString() || ''
        )}&endDate=${encodeURIComponent(endDate?.toISOString() || '')}`
      );
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    <>
      <form className={classes.container}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div className={classes.formContainer}>
            <div className={classes.dateContainer}>
              <KeyboardDatePicker
                margin='normal'
                id='check-in'
                label='Din data de'
                format='MM/dd/yyyy'
                value={startDate}
                minDate={today}
                onChange={setStartDate}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardDatePicker
                margin='normal'
                id='check-out'
                label='Pana in data de'
                format='MM/dd/yyyy'
                value={endDate}
                minDate={today}
                onChange={setEndDate}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <div className={classes.searchBtn}>
                <Button
                  variant='contained'
                  color='secondary'
                  onClick={onCheckAvailability}
                >
                  Rezerva
                </Button>
              </div>
            </div>
          </div>
        </MuiPickersUtilsProvider>
      </form>
      <Snackbar
        open={Boolean(errorMessage)}
        autoHideDuration={6000}
        onClose={() => setErrorMessage('')}
      >
        <Alert severity='error'>{errorMessage}</Alert>
      </Snackbar>
    </>
  );
}

export default AccommodationCalendarForm;
