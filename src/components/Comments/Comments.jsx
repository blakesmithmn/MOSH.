import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Paper, Card, CardContent, Typography, Button, ButtonGroup, CardActions, Box, Grid, CardMedia, FormGroup, TextField, Container, Avatar } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { deepOrange, deepPurple } from '@mui/material/colors';

function Comments({ eventID }) {
    const user = useSelector((store) => store.user);
    const comments = useSelector((store) => store.comments);

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
    const handleCommentPost = async () => {
        const userID = user.id;
        console.log('COMMENT TEXT AND EVENT ID', userID, comment, eventID);
        await dispatch({
            type: 'SAGA_ADD_COMMENT',
            payload: { userID, comment, eventID }
        })
        await dispatch({
            type: 'SAGA_FETCH_COMMENTS',
            payload: eventID
        })
        setComment('');

    }
    return (
        <Card>
            <CardContent>
                <Typography variant='h2'>COMMENTS</Typography>
            </CardContent>
            <CardContent >
                {comments.map(commentItem => (
                    <>
                        <Avatar sx={{ bgcolor: deepPurple[500] }}>{commentItem.first_name[0]}{commentItem.last_name[0]}</Avatar>
                        <Typography>{commentItem.comment}</Typography>
                    </>
                ))}
            </CardContent>
            <CardContent>
                <TextField size='small' placeholder='Write a comment ...' fullWidth onChange={(event) => setComment(event.target.value)} value={comment}></TextField>
                <Button variant='contained' color='secondary' onClick={handleCommentPost}>Submit</Button>
            </CardContent>
        </Card>

    )
}

export default Comments;