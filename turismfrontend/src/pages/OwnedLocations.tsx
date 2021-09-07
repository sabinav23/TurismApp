import TypoGraphy from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Location } from '../models/Location';
import { CircularProgress, Grid } from '@material-ui/core';
import LocationCard from '../components/LocationCard';
import { useProfile } from '../hooks/useProfile';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    },
    title: {
      marginBottom: 20,
    },
    loading: {
      marginTop: 50,
    },
    locationCard: {
      width: '50%',
      marginBottom: 15,
    },
  })
);

function OwnedLocations() {
  const classes = useStyles();

  const { isLoading, data: user } = useProfile();
  const myLocations = user?.myLocations;

  return (
    <div className={classes.container}>
      <TypoGraphy variant='h4' color='inherit' className={classes.title}>
        Gestioneaza locatiile
      </TypoGraphy>
      {isLoading || !myLocations ? (
        <CircularProgress className={classes.loading} />
      ) : (
        myLocations.map((location) => (
          <div className={classes.locationCard}>
            <LocationCard
              title={location.title}
              description={location.shortDescription}
              image={(location.images || []).find((i) => i.isPresentationImage)}
              id={location.id}
              averageStars={location.averageStars}
              isEditing
            />
          </div>
        ))
      )}
    </div>
  );
}

export default OwnedLocations;
