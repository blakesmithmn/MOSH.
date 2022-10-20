import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import crowdtestone from './crowdtestone.mp4'

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

// MUI IMPORTS
import { Paper, Card, CardContent, Typography, Button, ButtonGroup, CardActions, Box, Grid, CardMedia, FormGroup, TextField, Container, IconButton } from '@mui/material';

function LandingPage() {
  const [heading, setHeading] = useState("Let's MOSH.");
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <>
      <h2>{heading}</h2>
      <video id='background-video' autoPlay loop muted>
        <source src={crowdtestone} type='video/mp4' />
      </video>
      <Grid container direction="column" justifyContent="center" alignItems="center" >
        <Grid item xs={12} >
          {/* <RegisterForm /> */}
        </Grid>

      </Grid>

    </>


  );
}

export default LandingPage;
