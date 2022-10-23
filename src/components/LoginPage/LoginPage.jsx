import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import { Paper, Card, CardContent, Typography, Button, ButtonGroup, CardActions, Box, Grid, CardMedia, FormGroup, TextField, Container, IconButton } from '@mui/material';


function LoginPage() {
  const history = useHistory();

  return (
    <Grid container>
      <Grid item xs={12}>
        <LoginForm />
      </Grid>
    </Grid>
  );
}

export default LoginPage;
