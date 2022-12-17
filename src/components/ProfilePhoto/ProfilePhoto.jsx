import { Paper, Card, CardContent, Typography, Button, ButtonGroup, ButtonBase, CardActions, Box, Grid, CardMedia, FormGroup, TextField, Container, Avatar, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deepOrange, deepPurple, teal, pink, indigo, orange, green, lightblue } from '@mui/material/colors';
import './Avatar.css'


// the concept here is to be able to reference the 'user' information from the server
// and grab the color they set on registration ... and display it as the color for their avatar
// so I tried making a custom avatar component. 

function ProfilePhoto({ username }) {
    const getUserColor = (username) => {
        switch (username.color) {
            case 'pink':
                return pink[500];
            case 'deepPurple':
                return deepPurple[500];
            case 'indigo':
                return indigo[500];
            case 'teal':
                return teal[500];
            case 'green':
                return green[500];
            case 'orange':
                return orange[500];
            case 'lightBlue':
                return lightBlue[500];
        }
    };

    // color will be imported from user.color! 
    // letters imported using index of first and last name
    return (
        <Avatar sx={{ bgcolor: getUserColor(username) }}>{username.first_name[0]}{username.last_name[0]}</Avatar>
    )
}

export default ProfilePhoto;