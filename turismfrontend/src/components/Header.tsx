import React, { useContext } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TypoGraphy from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { Menu, MenuItem, Button } from '@material-ui/core';
import LandscapeIcon from '@material-ui/icons/Landscape';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AuthContext } from '../App';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    brand: {
      display: 'flex',
    },
    logo: {
      fontSize: 42,
    },
  })
);

const Header = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { isLoggedIn, setUserData, userData } = useContext(AuthContext);
  const history = useHistory();

  const isBusiness = userData?.isBusiness;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const logout = () => {
    setUserData(null);
    handleClose();
    history.push('/login');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar color='primary' position='static'>
        <Toolbar>
          <Link
            to='/'
            style={{
              textDecoration: 'none',
              color: 'white',
            }}
          >
            <TypoGraphy variant='h4' color='inherit' className={classes.brand}>
              <LandscapeIcon className={classes.logo} />
              ROtrip
            </TypoGraphy>
          </Link>

          {isBusiness ? (
            <List component='nav'>
              <ListItem component='div'>
                <ListItemText inset>
                  <Link
                    to='/add-location'
                    style={{
                      textDecoration: 'none',
                      color: 'white',
                    }}
                  >
                    <TypoGraphy variant='h5' style={{ width: 'max-content' }}>
                      Adauga locatie
                    </TypoGraphy>
                  </Link>
                </ListItemText>

                <ListItemText inset>
                  <Link
                    to='/my-locations'
                    style={{
                      textDecoration: 'none',
                      color: 'white',
                    }}
                  >
                    <TypoGraphy variant='h5' style={{ width: 'max-content' }}>
                      Locatiile mele
                    </TypoGraphy>
                  </Link>
                </ListItemText>
              </ListItem>
            </List>
          ) : (
            <List component='nav'>
              <ListItem component='div'>
                <ListItemText inset>
                  <Link
                    to='/'
                    style={{ textDecoration: 'none', color: 'white' }}
                  >
                    <TypoGraphy variant='h5'>Cazare</TypoGraphy>
                  </Link>
                </ListItemText>

                <ListItemText inset>
                  <Link
                    to='/restaurant'
                    style={{ textDecoration: 'none', color: 'white' }}
                  >
                    <TypoGraphy variant='h5'>Restaurant</TypoGraphy>
                  </Link>
                </ListItemText>
              </ListItem>
            </List>
          )}
          <Grid container justify='flex-end'>
            {isLoggedIn ? (
              <>
                <div onClick={handleClick}>
                  <Avatar src='/broken-image.jpg' />
                </div>
                <Menu
                  id='simple-menu'
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <Link
                    to='/profile/favorites'
                    style={{
                      textDecoration: 'none',
                      color: 'black',
                    }}
                  >
                    <MenuItem onClick={handleClose}>Profil</MenuItem>
                  </Link>
                  <MenuItem onClick={logout}>Deconectare</MenuItem>
                </Menu>
              </>
            ) : (
              <Link
                to='/login'
                style={{
                  textDecoration: 'none',
                }}
              >
                <Button variant='contained' color='secondary'>
                  Autentificare
                </Button>
              </Link>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
