import React, { useContext, useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Box from '@material-ui/core/Box';
import { Button, CircularProgress } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
// @ts-ignore
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel';
import AddComment from '../components/AddComment';
import AccommodationCalendarForm from '../components/AccommodationCalendarForm';
import Card from '@material-ui/core/Card';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneIcon from '@material-ui/icons/Phone';
import { useLocation } from '../hooks/useLocation';
import { useFavoriteLocation } from '../hooks/useFavoriteLocation';
import { useAddFavoriteLocation } from '../hooks/useAddFavoriteLocation';
import { useDeleteFavoriteLocation } from '../hooks/useDeleteFavoriteLocation';
import { useComments } from '../hooks/useComments';
import Comments from '../components/Comments';

import { AuthContext } from '../App';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Amenities from '../components/Amenities';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      flexDirection: 'column',
      overflow: 'hidden',
      mt: 20,
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      textAlign: 'center',
    },
    gridList: {
      width: '55%',
      height: 600,
    },
    actions: {
      position: 'absolute',
      zIndex: 2,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      width: '100%',
      justifyItems: 'end',
    },
    details: {
      width: '55%',
      margin: `${theme.spacing(0)} auto`,
      display: 'flex',
      flexDirection: 'row',
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 30,
    },
    accomodationInfo: {
      width: '55%',
      display: 'flex',
      alignSelf: 'center',
      marginTop: 15,
      justifyContent: 'space-between',
    },
    accomodationDescriptionSection: {
      width: '60%',
      padding: 15,
    },
    contactSection: {
      width: '30%',
      padding: 15,
      backgroundColor: '#f6ae2d',
      fontSize: 18,
    },
    contactMode: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    carouselButton: {
      gridColumnStart: 2,
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      marginTop: 5,
      borderRadius: 8,
      '&:hover': {
        backgroundColor: 'white',
      },
    },
    saveButton: {
      gridColumnStart: 3,
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      marginTop: 5,
      marginRight: 5,
      borderRadius: 8,
      '&:hover': {
        backgroundColor: 'white',
      },
    },
  })
);

export type LocationDetailsPageProps = {
  id: string | undefined;
};

function AccommodationPage() {
  const classes = useStyles();
  const [isCarouselOpen, setCarouselOpen] = useState(false);
  const { isLoggedIn, userData } = useContext(AuthContext);
  const history = useHistory();

  const isBusiness = userData?.isBusiness;

  const { id } = useParams<LocationDetailsPageProps>();

  const { data } = useLocation(id);
  const { data: favoriteLocation } = useFavoriteLocation(id);
  const { data: comments } = useComments(id);

  const addFavoriteLocation = useAddFavoriteLocation();
  const deleteFavoriteLocation = useDeleteFavoriteLocation();

  if (!data) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress />
      </div>
    );
  }

  const saveLocation = () => {
    if (!isLoggedIn) {
      return history.push('/login');
    }
    addFavoriteLocation.mutate(id);
  };

  const deleteSavedLocation = () => {
    deleteFavoriteLocation.mutate(id);
  };

  const presentationImage = data.images.find((i) => i.isPresentationImage);

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>{data?.title}</h1>

      <Box justifyContent='center' display='flex'>
        <GridList cellHeight={195} className={classes.gridList} cols={4}>
          <GridListTile cols={4} rows={1}>
            <div className={classes.actions}>
              <Button
                onClick={() => setCarouselOpen(true)}
                className={classes.carouselButton}
              >
                Afiseaza toate fotografiile
              </Button>
              {favoriteLocation ? (
                <Button
                  className={classes.saveButton}
                  onClick={deleteSavedLocation}
                >
                  <FavoriteIcon />
                  <h5 style={{ margin: '0' }}>Locatie Salvata</h5>
                </Button>
              ) : (
                <Button className={classes.saveButton} onClick={saveLocation}>
                  <FavoriteBorderRoundedIcon />
                  <h5 style={{ margin: '0' }}>Salveaza</h5>
                </Button>
              )}
            </div>

            <AutoRotatingCarousel
              open={isCarouselOpen}
              onClose={() => setCarouselOpen(false)}
              onStart={() => setCarouselOpen(false)}
              style={{ position: 'absolute ' }}
              height='100%'
              weight='100%'
              autoplay={false}
            >
              {data.images.map(({ data }) => (
                <Slide
                  media={
                    <img
                      src={`data:image/png;base64, ${data}`}
                      style={{ height: '100%', width: '100%' }}
                    />
                  }
                  mediaBackgroundStyle={{
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
                  }}
                />
              ))}
            </AutoRotatingCarousel>
            {presentationImage && (
              <img src={`data:image/png;base64, ${presentationImage.data}`} />
            )}
          </GridListTile>
          {data.images
            .filter((i) => !i.isPresentationImage)
            .slice(0, 4)
            .map(({ data }, index) => (
              <GridListTile key={index} cols={2} rows={1}>
                <img src={`data:image/png;base64, ${data}`} />
              </GridListTile>
            ))}
        </GridList>
      </Box>

      <div className={classes.accomodationInfo}>
        <Card className={classes.accomodationDescriptionSection}>
          <h3>Detalii </h3>
          <div>{data?.mainDescription}</div>
          {isBusiness ? (
            <>
              <h3>Pret</h3>
              <div>{data?.price} RON / noapte</div>
            </>
          ) : null}
        </Card>
        <Card className={classes.contactSection}>
          <h3>Contact</h3>
          <div>
            <h5 className={classes.contactMode}>
              <PhoneIcon style={{ marginRight: '10' }} />
              Numar de telefon: {data?.phone}
            </h5>
            <h5 className={classes.contactMode}>
              <MailOutlineIcon style={{ marginRight: '10' }} />
              Adresa de email: {data?.email}
            </h5>
          </div>
        </Card>
      </div>
      {data?.isAccomodation && (
        <div className={classes.details}>
          {data.amenities ? <Amenities amenities={data.amenities} /> : null}
          <AccommodationCalendarForm locationId={id} />
        </div>
      )}

      <AddComment locationId={id} />
      {comments && comments.length > 0 ? (
        <Comments comments={comments} />
      ) : null}
    </div>
  );
}

export default AccommodationPage;
