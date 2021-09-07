import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import { CardMedia } from '@material-ui/core';
import { useAddLocation, ILocationData } from '../hooks/useAddLocation';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AddLocationForm from '../components/AddLocationForm';

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

const AddLocation = () => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);

  const isAccomodation = tab === 0;

  const addLocation = useAddLocation();

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };

  const onAddLocation = (location: ILocationData) => {
    addLocation.mutate(location);
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
        <div className={classes.tabsContainer}>
          <div className={classes.tabs}>
            <Tabs value={tab} onChange={handleTabChange} centered>
              <Tab label='Cazare' />
              <Tab label='Restaurant' />
            </Tabs>
          </div>
        </div>
        <AddLocationForm
          isAccomodation={isAccomodation}
          addLocation={onAddLocation}
        />
      </div>
    </div>
  );
};

export default AddLocation;
