import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Paper, Card, CardContent, Typography, Button, CardActions, Box, Grid, CardMedia, FormGroup, TextField, Container } from '@mui/material';
import { useHistory } from 'react-router-dom';


function LoginForm() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  const sendToRegister = () => {
    history.push('/home/join');
  }
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5">Log In to an Existing Account</Typography>
            <Typography gutterBottom color="textSecondary" variant="body2" component="p">Complete this form to get started.</Typography>
            <form onSubmit={login}>
              <Grid container spacing={2}>
                <Grid xs={12} item>
                  <TextField required id="outlined-basic" variant="outlined" type="text" label="Username" placeholder="Enter Username" value={username} onChange={(event) => setUsername(event.target.value)} fullWidth />
                </Grid>
                <Grid xs={12} item>
                  <TextField required id="outlined-basic" variant="outlined" type="password" label="Password" placeholder="Enter Password" value={password} onChange={(event) => setPassword(event.target.value)} fullWidth />
                </Grid>
                <Grid xs={12} sm={4} item>
                  <Button type="submit" variant="contained" fullWidth>Log In</Button>
                </Grid>
                <Grid xs={12} sm={4} item>
                  <Button onClick={sendToRegister} variant="contained" color='secondary' fullWidth>Sign Up</Button>
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
    // <form className="formPanel" onSubmit={login}>
    //   <h2>Login</h2>
    //   {errors.loginMessage && (
    //     <h3 className="alert" role="alert">
    //       {errors.loginMessage}
    //     </h3>
    //   )}
    //   <div>
    //     <label htmlFor="username">
    //       Username:
    //       <input
    //         type="text"
    //         name="username"
    //         required
    //         value={username}
    //         onChange={(event) => setUsername(event.target.value)}
    //       />
    //     </label>
    //   </div>
    //   <div>
    //     <label htmlFor="password">
    //       Password:
    //       <input
    //         type="password"
    //         name="password"
    //         required
    //         value={password}
    //         onChange={(event) => setPassword(event.target.value)}
    //       />
    //     </label>
    //   </div>
    //   <div>
    //     <input className="btn" type="submit" name="submit" value="Log In" />
    //   </div>
    // </form>
  );
}

export default LoginForm;
