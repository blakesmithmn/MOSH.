import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import HomePage from '../HomePage/HomePage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import EventSearch from '../EventSearch/EventSearch';
import EventDetails from '../EventDetails/EventDetails';
import Profile from '../Profile/Profile';
import EditProfile from '../Profile/EditProfile';
import MobileNav from '../MobileNav/MobileNav';
import Logo from '../LandingPage/Logo'
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);
  const theme = createTheme({
    palette: {
      primary: {
        main: '#333533',
        contrastText: '#FFD100',
      },
      secondary: {
        main: '#202020',
        contrastText: '#FFD100',
      },
      background: {
        paper: 'rgba(244,245,245,0.7)',
      }
    },
  });
  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <Nav />

          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            <Route
              // shows Login on Home Page
              exact
              path="/home/"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect to the /user page
                <Redirect to="/user" />
                :
                // Otherwise, show the login page
                <>
                  <Logo />
                  <LandingPage />

                </>
              }

            </Route>

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
            >
              <AboutPage />
            </Route>

            <Route
              // shows Login on Home Page
              exact
              path="/home/login"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect to the /user page
                <Redirect to="/user" />
                :
                // Otherwise, show the login page
                <>
                  <LandingPage />
                  <LoginPage />
                </>
              }

            </Route>

            <Route
              // shows Create Account on Home Page
              exact
              path="/home/join"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect to the /user page
                <Redirect to="/user" />
                :
                // Otherwise, show the login page
                <>
                  <LandingPage />
                  <RegisterPage />
                </>
              }
            </Route>

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/user"
            >
              <HomePage />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/info"
            >
              <InfoPage />
            </ProtectedRoute>

            <Route
              exact
              path="/login"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect to the /user page
                <Redirect to="/user" />
                :
                // Otherwise, show the login page
                <LoginPage />
              }
            </Route>

            <Route
              exact
              path="/registration"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect them to the /user page
                <Redirect to="/user" />
                :
                // Otherwise, show the registration page
                <RegisterPage />
              }
            </Route>

            <Route
              exact
              path="/home"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect them to the /user page
                <Redirect to="/user" />
                :
                // Otherwise, show the Landing page
                <LandingPage />
              }
            </Route>
            <ProtectedRoute
              // shows AboutPage at all times (logged in or not)
              exact
              path="/search"
            >
              <EventSearch />
            </ProtectedRoute>

            <ProtectedRoute
              // shows AboutPage at all times (logged in or not)
              exact
              path="/details/:id"
            >
              <EventDetails />
            </ProtectedRoute>
            <ProtectedRoute
              // shows AboutPage at all times (logged in or not)
              exact
              path="/profile/:id"
            >
              <Profile />
            </ProtectedRoute>
            <ProtectedRoute
              // shows AboutPage at all times (logged in or not)
              exact
              path="/profile/edit/:id"
            >
              <EditProfile />
            </ProtectedRoute>
            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
          <Footer />
          {user.id && (
            <MobileNav />
          )}
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
