import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Card, CardContent } from '@material-ui/core';
import {
  Link,
  useRouteMatch,
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';
import TypoGraphy from '@material-ui/core/Typography';
import ProfileFavoritedPage from './ProfileFavoritedPage';
import ProfileBookedPage from './ProfileBookedPage';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import StarOutlineOutlinedIcon from '@material-ui/icons/StarOutlineOutlined';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 50,
    },
    card: {
      display: 'flex',
      justifyContent: 'center',
      minWidth: 225,
      height: '100%',
    },
    link: {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      color: 'black',
    },
    linkBorder: {
      borderTop: '1px solid lightgray',
    },
    postsContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    },
    icon: {
      marginRight: 10,
    },
    selected: {
      color: '#F26419',
    },
  })
);

function ProfilePage() {
  const classes = useStyles();
  const { path, url } = useRouteMatch();
  const { pathname } = useLocation();

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <CardContent>
          <Link
            to={`${url}/favorites`}
            className={`${classes.link} ${
              pathname === '/profile/favorites' ? classes.selected : ''
            }`}
          >
            <FavoriteBorderRoundedIcon className={classes.icon} />
            <TypoGraphy variant='h6' color='inherit'>
              Locatii favorite
            </TypoGraphy>
          </Link>
          <Link
            to={`${url}/booked`}
            className={`${classes.link} ${
              pathname === '/profile/booked' ? classes.selected : ''
            }`}
          >
            <StarOutlineOutlinedIcon className={classes.icon} />
            <TypoGraphy variant='h6' color='inherit'>
              Locatii rezervate
            </TypoGraphy>
          </Link>
        </CardContent>
      </Card>
      <Switch>
        <Route path={`${path}/favorites`}>
          <ProfileFavoritedPage />
        </Route>
        <Route path={`${path}/booked`}>
          <ProfileBookedPage />
        </Route>
      </Switch>
    </div>
  );
}

export default ProfilePage;
