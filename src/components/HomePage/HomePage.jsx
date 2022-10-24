import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import UpcomingEvents from '../UpcomingEvents/UpcomingEvents';
import { deepOrange, deepPurple, teal, pink, indigo, orange, green, lightBlue } from '@mui/material/colors';
import NoEvents from '../UpcomingEvents/NoEvents'
import { Paper, Card, CardContent, Typography, Button, ButtonGroup, CardActions, Box, Grid, CardMedia, FormGroup, TextField, Container, Avatar, IconButton } from '@mui/material';


function HomePage() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'SAGA_FETCH_USER_EVENTS',
      payload: user.id
    })
  }, []);
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const events = useSelector((store) => store.events.userEvents);

  return (
    <div className="container">
      <Typography variant='h2' sx={{ color: "#FFFFFF" }}>Welcome, {user.first_name}!</Typography>
      {/* <p>Your ID is: {user.id}</p> */}
      {events.length > 0 ?

        <UpcomingEvents user={user} />

        :
        <NoEvents />
      }
    </div>
  );
}

// this allows us to use <App /> in index.js
export default HomePage;
