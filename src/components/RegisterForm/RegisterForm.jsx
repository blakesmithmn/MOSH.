import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Paper, Card, CardContent, Typography, Button, CardActions, Box, Grid, CardMedia, FormGroup, TextField, Container, FormControl, MenuItem, Select, InputLabel, FormHelperText } from '@mui/material';
import { useHistory } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


function RegisterForm() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [color, setColor] = useState('')
  const [zipcode, setZipcode] = useState('');

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();
    console.log(color);
    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        zipcode: zipcode,
        color: color,
      },
    });
  }; // end registerUser

  const handleBack = () => {
    history.push('/search');
  }
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6}>
        <Card className='CardForm'>
          <CardContent>
            <Typography gutterBottom variant="h5">Create an Account</Typography>
            <Typography gutterBottom color="textSecondary" variant="body2" component="p">Complete this form to get started.</Typography>
            <form onSubmit={registerUser}>
              <Grid container spacing={2}>
                <Grid xs={12} sm={6} item>
                  <TextField required id="outlined-basic" variant="outlined" type="text" label="First Name" placeholder="Enter First Name" value={firstName} onChange={(event) => setFirstName(event.target.value)} fullWidth />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField required id="outlined-basic" variant="outlined" type="text" label="Last Name" placeholder="Enter Last Name" value={lastName} onChange={(event) => setLastName(event.target.value)} fullWidth />
                </Grid>
                <Grid xs={12} item>
                  <TextField required id="outlined-basic" variant="outlined" type="text" label="Username" placeholder="Enter Username" value={username} onChange={(event) => setUsername(event.target.value)} fullWidth />
                </Grid>
                <Grid xs={12} item>
                  <TextField required id="outlined-basic" variant="outlined" type="password" label="Password" placeholder="Enter Password" value={password} onChange={(event) => setPassword(event.target.value)} fullWidth />
                </Grid>

                <Grid xs={12} sm={4} item>
                  <TextField required id="outlined-basic" variant="outlined" type="number" label="Zipcode" placeholder="Enter Zipcode" value={zipcode} onChange={(event) => setZipcode(event.target.value)} fullWidth />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <InputLabel>Color</InputLabel>
                    <Select
                      value={color}
                      label="Pick a Color"
                      onChange={(event) => setColor(event.target.value)}
                      required
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={'pink'}>Pink</MenuItem>
                      <MenuItem value={'deepPurple'}>Purple</MenuItem>
                      <MenuItem value={'indigo'}>Indigo</MenuItem>
                      <MenuItem value={'teal'}>Teal</MenuItem>
                      <MenuItem value={'green'}>Green</MenuItem>
                      <MenuItem value={'orange'}>Orange</MenuItem>
                      <MenuItem value={'lightBlue'}>Blue</MenuItem>
                    </Select>
                    <FormHelperText>Pick a Color for your Avatar</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={4} item>
                  <Button type="submit" variant="contained" fullWidth>Register</Button>
                </Grid>
                <Grid xs={12} sm={4} item>
                  <Button onClick={handleBack} variant="contained" color='error' fullWidth>Cancel</Button>
                </Grid>

              </Grid>
            </form>
          </CardContent>


        </Card>
      </Grid>
    </Grid>
  );
}

export default RegisterForm;
