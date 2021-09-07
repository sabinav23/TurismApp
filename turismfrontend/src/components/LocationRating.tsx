import React, { useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles(() =>
  createStyles({
    iconFilled: {
      color: '#ff3d47',
    },
  })
);

interface LocationRatingProps {
  stars: number;
}

function LocationRating({ stars }: LocationRatingProps) {
  const classes = useStyles();

  return (
    <Rating
      precision={0.5}
      icon={<FavoriteIcon fontSize='inherit' />}
      value={stars}
      className={classes.iconFilled}
      readOnly
    />
  );
}

export default LocationRating;
