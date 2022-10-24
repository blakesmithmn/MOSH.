import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import { Paper, Card, CardContent, Typography, Button, ButtonGroup, CardActions, Box, Grid, CardMedia, FormGroup, TextField, Container, IconButton } from '@mui/material';
import './RegisterPage.css'
function RegisterPage() {
  const history = useHistory();

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <RegisterForm />
      </Grid>
    </Grid>



  );
}

export default RegisterPage;
