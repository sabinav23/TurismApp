import React, { useState } from 'react';
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
      width: '100%',
    },
    formContainer: {
      display: 'flex',
      width: '100%',
    },
    searchBtn: {
      marginLeft: 50,
      marginTop: 15,
    },
  })
);

interface RestaurantSearchFormProps {
  onSearch: (data: UseLocationsData) => void;
}

function RestaurantSearchForm({ onSearch }: RestaurantSearchFormProps) {
  const classes = useStyles();

  const [error, setError] = useState<string | null>(null);
  const [county, setCounty] = useState<string | null>(null);

  const onSearchClicked = () => {
    onSearch({ county, isAccomodation: false });
  };

  return (
    <form className={classes.container}>
      <div className={classes.formContainer}>
        <Autocomplete
          id='location'
          options={counties}
          value={county}
          onChange={(e, value) => setCounty(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Unde doriti sa luati masa'
              className={classes.textField}
            />
          )}
          fullWidth
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
    </form>
  );
}

export default RestaurantSearchForm;
