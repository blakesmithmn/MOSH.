import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Paper, Card, CardContent, Typography, Button, ButtonGroup, CardActions, Box, Grid, CardMedia, FormGroup, TextField, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Comments({ eventID }) {
    const user = useSelector((store) => store.user);

    return (
        <Card>
            <CardContent>
                <Typography variant='h2'>COMMENTS</Typography>
            </CardContent>
            <CardContent>
                <Typography variant='body2'>Hey wanna go to this thing?</Typography>
                <Typography variant='body2'>Sure Let's Go!</Typography>
                <Typography variant='body2'>See you there</Typography>
                <Typography variant='body2'>I have an extra ticket - anyone wanna tag along!?</Typography>
                <Typography variant='body2'>Can't make it anymore ... someone want my tickets?</Typography>
            </CardContent>
        </Card>

    )
}

export default Comments;