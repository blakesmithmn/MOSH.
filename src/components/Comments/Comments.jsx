import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Paper, Card, CardContent, Typography, Button, ButtonGroup, CardActions, Box, Grid, CardMedia, FormGroup, TextField, Container, Avatar } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { deepOrange, deepPurple } from '@mui/material/colors';

function Comments({ eventID }) {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();

    const [comment, setComment] = useState('');

    useEffect(() => {
        console.log('COMMENTS LOADED');
        dispatch({
            type: 'SAGA_FETCH_COMMENTS',
            payload: eventID
        })
        console.log(eventID)
    }, []);

    // DISPATCH TO FETCH COMMENTS FROM USERS_COMMENTS
    // DISPATCH TO POST COMMENT TO USERS_COMMENTS
    const handleCommentPost = () => {
        console.log('COMMENT TEXT AND EVENT ID', comment, eventID);
        setComment('');
    }
    return (
        <Card>
            <CardContent>
                <Typography variant='h2'>COMMENTS</Typography>
            </CardContent>
            <CardContent >
                <Typography variant='body2' component="div"><Avatar sx={{ bgcolor: deepOrange[500] }}>NT</Avatar>  Hey wanna go to this thing?</Typography>
                <Avatar sx={{ bgcolor: deepPurple[500] }}>BS</Avatar><Typography variant='body2'>Sure Let's Go!</Typography>
                <Avatar sx={{ bgcolor: deepOrange[500] }}>GG</Avatar> <Typography variant='body2'>See you there</Typography>
                <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar> <Typography variant='body2'>I have an extra ticket - anyone wanna tag along!?</Typography>
                <Avatar sx={{ bgcolor: deepOrange[500] }}>LM</Avatar> <Typography variant='body2'>Can't make it anymore ... someone want my tickets?</Typography>
            </CardContent>
            <CardContent>
                <TextField size='small' placeholder='Write a comment ...' fullWidth onChange={(event) => setComment(event.target.value)} value={comment}></TextField>
                <Button variant='contained' color='secondary' onClick={handleCommentPost}>Submit</Button>
            </CardContent>
        </Card>

    )
}

export default Comments;