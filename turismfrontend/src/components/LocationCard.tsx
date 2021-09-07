import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import LocationRating from './LocationRating';
import { Image } from '../models/Image';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useDeleteLocation } from '../hooks/useDeleteLocation';

type PostProps = {
  id: number;
  title: string;
  image: Image | undefined;
  description: string;
  averageStars: number;
  isEditing?: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actions: {
      marginLeft: 'auto !important',
      marginRight: 10,
    },
  })
);

function LocationCard(props: PostProps) {
  const classes = useStyles();
  const deleteLocation = useDeleteLocation();

  const { id, title, image, description, averageStars, isEditing } = props;

  const onDeleteLocation = () => {
    deleteLocation.mutate(id);
  };

  return (
    <Grid item key={title}>
      <Card>
        <CardActionArea>
          {image && (
            <CardMedia
              component='img'
              height='200'
              image={`data:image/png;base64, ${image.data}`}
            />
          )}

          <CardContent>
            <Typography gutterBottom variant='h6' component='h3'>
              {title}
            </Typography>
            <Typography component='p'>{description}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <LocationRating stars={averageStars} />
          <div className={classes.actions}>
            {isEditing ? (
              <>
                <Button size='small' color='primary' onClick={onDeleteLocation}>
                  STERGE
                </Button>
                <Link
                  to={`/edit-location/${props.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Button size='small' color='primary'>
                    MODIFICA
                  </Button>
                </Link>
              </>
            ) : (
              <Link
                to={`/locations/${props.id}`}
                style={{ textDecoration: 'none' }}
              >
                <Button size='small' color='primary'>
                  DETALII
                </Button>
              </Link>
            )}
          </div>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default LocationCard;
