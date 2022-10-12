import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Paper, Card, CardContent, Typography, Button, CardActions, Box, Grid, CardMedia, FormGroup, TextField, Container } from '@mui/material';
import { useHistory } from 'react-router-dom';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [zipcode, setZipcode] = useState('');

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        zipcode: zipcode,
      },
    });
  }; // end registerUser

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5">Create an Account</Typography>
            <Typography gutterBottom color="textSecondary" variant="body2" component="p">Complete this form to get started.</Typography>
            <form onSubmit={registerUser}>
              <Grid container spacing={2}>
                <Grid xs={12} item>
                  <TextField required id="outlined-basic" variant="outlined" type="text" label="Username" placeholder="Enter Username" value={username} onChange={(event) => setUsername(event.target.value)} fullWidth />
                </Grid>
                <Grid xs={12} item>
                  <TextField required id="outlined-basic" variant="outlined" type="password" label="Password" placeholder="Enter Password" value={password} onChange={(event) => setPassword(event.target.value)} fullWidth />
                </Grid>

                <Grid xs={12} sm={4} item>
                  <TextField required id="outlined-basic" variant="outlined" type="number" label="Zipcode" placeholder="Enter Zipcode" value={zipcode} onChange={(event) => setZipcode(event.target.value)} fullWidth />
                </Grid>
                <Grid xs={12} sm={4} item>
                  <Button type="submit" variant="contained" fullWidth>Register</Button>
                </Grid>
                {/* <Grid xs={12} sm={4} item>
                        <Button onClick={clearForm} variant="outlined" fullWidth>Clear Form</Button>
                        </Grid> */}
              </Grid>
            </form>
          </CardContent>


        </Card>
      </Grid>
    </Grid>
  );
}

export default RegisterForm;
