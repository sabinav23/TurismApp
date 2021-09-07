import TypoGraphy from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Location } from '../models/Location';
import { CircularProgress, Grid } from '@material-ui/core';
import LocationCard from '../components/LocationCard';
import { useFavoriteLocations } from '../hooks/useFavoriteLocations';

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

function ProfileFavoritedPage() {
  const classes = useStyles();

  const { isLoading, data: favoriteLocations } = useFavoriteLocations();

  return (
    <div className={classes.container}>
      <TypoGraphy variant='h4' color='inherit' className={classes.title}>
        Locatii favorite
      </TypoGraphy>
      <Grid container direction='column' alignItems='center'>
        {isLoading || !favoriteLocations ? (
          <CircularProgress className={classes.loading} />
        ) : (
          (favoriteLocations || []).map((location) => (
            <div className={classes.locationCard}>
              <LocationCard
                title={location.title}
                description={location.shortDescription}
                image={(location.images || []).find(
                  (i) => i.isPresentationImage
                )}
                id={location.id}
                averageStars={location.averageStars}
              />
            </div>
          ))
        )}
      </Grid>
    </div>
  );
}

export default ProfileFavoritedPage;
