import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import UpcomingEvents from '../UpcomingEvents/UpcomingEvents';
import { deepOrange, deepPurple, teal, pink, indigo, orange, green, lightBlue } from '@mui/material/colors';
import NoEvents from '../UpcomingEvents/NoEvents';

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
      <h2>Welcome, {user.first_name}!</h2>
      <p>Your ID is: {user.id}</p>
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
