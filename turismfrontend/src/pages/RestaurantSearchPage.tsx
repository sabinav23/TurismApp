import React, { useState } from 'react';
import { CircularProgress, Grid } from '@material-ui/core';
import LocationCard from '../components/LocationCard';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AccomodationSearchForm from '../components/AccomodationSearchForm';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { useLocations, UseLocationsData } from '../hooks/useLocations';
import RestaurantSearchForm from '../components/RestaurantSearchForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      mt: 20,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    card: {
      height: 700,
      width: '85%',
      justifyContent: 'center',
      alignSelf: 'center',
      marginTop: 10,
      display: 'flex',
    },
    media: {
      width: '100%',
      height: '100%',
    },
    searchForm: {
      zIndex: 2,
      position: 'absolute',
      backgroundColor: '#fff',
      opacity: 0.9,
      marginTop: 100,
    },
    container: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 20,
      marginLeft: '7.5%',
      marginRight: '7.5%',
    },
  })
);

function RestaurantSearchPage() {
  const classes = useStyles();

  const [queryData, setQueryData] = useState<UseLocationsData | undefined>();

  const { isLoading, data } = useLocations({
    ...queryData,
    isAccomodation: false,
  });

  const onSearch = (data: UseLocationsData) => {
    setQueryData(data);
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={
            'https://4619sf29oljs20t4g13svvgz-wpengine.netdna-ssl.com/wp-content/uploads/2019/10/TopSliderDINING-01.jpg'
          }
        />
        <div className={classes.searchForm}>
          <RestaurantSearchForm onSearch={onSearch} />
        </div>
      </Card>
      <div className={classes.container}>
        <Grid container spacing={isLoading ? 0 : 2} justify='center'>
          {isLoading ? (
            <CircularProgress />
          ) : (
            data?.map((location) => (
              <Grid item xs={6}>
                <LocationCard
                  title={location.title}
                  description={location.shortDescription}
                  image={(location.images || []).find(
                    (i) => i.isPresentationImage
                  )}
                  id={location.id}
                  averageStars={location.averageStars}
                />
              </Grid>
            ))
          )}
        </Grid>
      </div>
    </div>
  );
}

export default RestaurantSearchPage;
