import React, { createContext } from 'react';
import Header from './components/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccommodationSearchPage from './pages/AccommodationSearchPage';
import AccommodationPage from './pages/AccommodationPage';
import RestaurantSearchPage from './pages/RestaurantSearchPage';
import ProfilePage from './pages/ProfilePage';
import BookingPage from './pages/BookingPage';
import AddLocation from './pages/AddLocation';
import ManageAccomodation from './pages/ManageAccomodation';
import OwnedLocations from './pages/OwnedLocations';
import { QueryClient, QueryClientProvider } from 'react-query';
import useLocalStorage from './hooks/useLocalStorage';
import { addTokenInterceptor } from './utils/axios';

const queryClient = new QueryClient();

interface UserData {
  token: string;
  isBusiness: boolean;
}

interface IAuthContext {
  isLoggedIn: boolean;
  userData: UserData | null;
  setUserData: (userData: UserData | null) => void;
}

export const AuthContext = createContext<IAuthContext>({
  isLoggedIn: false,
  userData: null,
  setUserData: (userData: UserData | null) => {},
});

function App() {
  const [userData, setUserData] = useLocalStorage('auth');
  addTokenInterceptor(userData?.token);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: Boolean(userData),
        userData: userData,
        setUserData: setUserData,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <div className='App'>
          <Router>
            <Header />
            <Switch>
              <Route path='/login'>
                <LoginPage />
              </Route>
              <Route path='/register'>
                <RegisterPage />
              </Route>
              <Route path='/locations/:id'>
                <AccommodationPage />
              </Route>
              <Route path='/restaurant'>
                <RestaurantSearchPage />
              </Route>
              <Route path='/profile'>
                <ProfilePage />
              </Route>
              <Route path='/booking/:id'>
                <BookingPage />
              </Route>
              <Route path='/edit-location/:id'>
                <ManageAccomodation />
              </Route>
              <Route path='/add-location'>
                <AddLocation />
              </Route>
              <Route path='/my-locations'>
                <OwnedLocations />
              </Route>
              <Route path='/'>
                {userData?.isBusiness ? (
                  <Redirect to='/add-location' />
                ) : (
                  <AccommodationSearchPage />
                )}
              </Route>
            </Switch>
          </Router>
        </div>
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}

export default App;
