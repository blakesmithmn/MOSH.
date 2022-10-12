import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Paper, Card, CardContent, Typography, Button, CardActions, Box, Grid, CardMedia, FormGroup, TextField, Container } from '@mui/material';
import { useHistory } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


function Profile() {
    const user = useSelector((store) => store.user);

    return (
        <>
            <h1>Welcome to your Profile: {user.first_name} </h1>
            <p>Current ZipCode: {user.zipcode}</p>
            <h2>About Me: </h2>
            <p>{user.about_me}</p>
        </>
    )
}

export default Profile;