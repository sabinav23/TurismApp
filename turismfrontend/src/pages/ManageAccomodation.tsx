import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import { CardMedia } from '@material-ui/core';
import { ILocationData } from '../hooks/useAddLocation';
import { useUpdateLocation } from '../hooks/useUpdateLocation';
import AddLocationForm from '../components/AddLocationForm';
import { useParams } from 'react-router-dom';
import { useLocation } from '../hooks/useLocation';
import { LocationDetailsPageProps } from './AccommodationPage';

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
      height: '90%',
      boxShadow: '5px 5px 18px -1px rgba(0,0,0,0.82)',
      position: 'relative',
    },
    media: {
      width: '100%',
      height: '100%',
    },
    tabsContainer: {
      zIndex: 3,
      display: 'flex',
      position: 'absolute',
      top: 135,
      left: 150,
      width: '40%',
    },
    tabs: {
      width: '80%',
    },
  });
});

const ManageLocation = () => {
  const classes = useStyles();

  const updateLocation = useUpdateLocation();

  const { id } = useParams<LocationDetailsPageProps>();
  const { data, isLoading } = useLocation(id);

  if (isLoading) {
    return null;
  }

  const onUpdateLocation = (location: ILocationData) => {
    updateLocation.mutate({ id, location });
  };

  return (
    <div className={classes.root}>
      <Card className={classes.imageCard}>
        <CardMedia
          className={classes.media}
          image={
            'https://2qibqm39xjt6q46gf1rwo2g1-wpengine.netdna-ssl.com/wp-content/uploads/2020/09/22815071_web1_M-steves-edh-200927.jpg'
          }
        />
      </Card>
      <div>
        <AddLocationForm
          isAccomodation={data?.isAccomodation || false}
          addLocation={onUpdateLocation}
          state={data}
          isEditing
        />
      </div>
    </div>
  );
};

export default ManageLocation;
