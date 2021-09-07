import 'date-fns';
import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { counties } from '../utils/counties';
import { Autocomplete } from '@material-ui/lab';
import { UseLocationsData } from '../hooks/useLocations';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'row',
      flex: 'wrap',
      width: 800,
      margin: `${theme.spacing(0)} auto`,
      justifyContentL: 'space-around',
      padding: 30,
    },
    textField: {
      marginBottom: 30,
    },
    formContainer: {
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
    },
    dateContainer: {
      display: 'flex',
      alignItems: 'flex-end',
      width: '100%',
      justifyContent: 'space-between',
    },
    searchBtn: {
      marginBottom: 8,
    },
  })
);

interface AccomodationSearchFormProps {
  onSearch: (data: UseLocationsData) => void;
}

function AccomodationSearchForm({ onSearch }: AccomodationSearchFormProps) {
  const classes = useStyles();

  const [county, setCounty] = useState<string | null>(null);
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);

  const onSearchClicked = () => {
    onSearch({ county, startDate, endDate, isAccomodation: true });
  };

  return (
    <form className={classes.container}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className={classes.formContainer}>
          <Autocomplete
            id='location'
            options={counties}
            value={county}
            onChange={(e, value) => setCounty(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Unde doriti sa calatoriti'
                className={classes.textField}
              />
            )}
          />
          <div className={classes.dateContainer}>
            <KeyboardDatePicker
              margin='normal'
              id='check-in'
              label='Din data de'
              format='MM/dd/yyyy'
              value={startDate}
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
              onChange={setEndDate}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <div className={classes.searchBtn}>
              <Button
                variant='contained'
                color='secondary'
                onClick={onSearchClicked}
              >
                Cauta
              </Button>
            </div>
          </div>
        </div>
      </MuiPickersUtilsProvider>
    </form>
  );
}

export default AccomodationSearchForm;
