import TypoGraphy from '@material-ui/core/Typography';
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { CircularProgress, Grid } from '@material-ui/core';
import LocationCard from '../components/LocationCard';
import { useProfile } from '../hooks/useProfile';
import { useDeleteBooking } from '../hooks/useDeleteBooking';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import { Booking } from '../models/Booking';
import { useBookedLocations } from '../hooks/useBookedLocations';

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
    booking: {
      display: 'flex',
      alignItems: 'center',
      fontSize: 15,
      marginBottom: 15,
    },
    deleteButtonContainer: {
      marginLeft: 'auto',
    },
    deleteButton: {
      marginLeft: 15,
    },
    bookingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    },
    bookingTitle: {
      fontWeight: 'bold',
      fontSize: 20,
      marginBottom: 20,
    },
  })
);

function ProfileBookedPage() {
  const classes = useStyles();

  const { isLoading, data } = useBookedLocations();
  const bookings = data || [];
  const deleteBooking = useDeleteBooking();

  const onDelete = (id: number) => {
    deleteBooking.mutate(id);
  };

  const pastBookings = bookings.filter(({ startDate }) =>
    moment(startDate).isBefore(moment(), 'day')
  );
  const futureBookings = bookings.filter(({ startDate }) =>
    moment(startDate).isSameOrAfter(moment(), 'day')
  );

  const getBookings = (
    label: string,
    bookings: Booking[],
    hasDelete: boolean = false
  ) => {
    if (bookings.length === 0) {
      return null;
    }
    return (
      <div className={classes.bookingContainer}>
        <div className={classes.bookingTitle}>{label}</div>
        {bookings.map(
          ({ id, firstName, lastName, startDate, endDate, location }) => (
            <div className={classes.locationCard}>
              <div className={classes.booking}>
                <span>
                  Rezervare pentru{' '}
                  <b>
                    {firstName} {lastName}
                  </b>{' '}
                  din data{' '}
                  <b>
                    {moment(startDate).format('DD.MM.YYYY')} -{' '}
                    {moment(endDate).format('DD.MM.YYYY')}
                  </b>
                </span>
                {hasDelete && (
                  <div className={classes.deleteButtonContainer}>
                    <Button
                      className={classes.deleteButton}
                      variant='contained'
                      color='secondary'
                      onClick={() => onDelete(id)}
                    >
                      Anuleaza
                    </Button>
                  </div>
                )}
              </div>
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
          )
        )}
      </div>
    );
  };

  return (
    <div className={classes.container}>
      <TypoGraphy variant='h4' color='inherit' className={classes.title}>
        Locatii rezervate
      </TypoGraphy>
      {isLoading ? (
        <CircularProgress className={classes.loading} />
      ) : (
        <>
          {getBookings('Rezervari trecute', pastBookings)}
          {getBookings('Rezervari viitoare', futureBookings, true)}
        </>
      )}
    </div>
  );
}

export default ProfileBookedPage;
