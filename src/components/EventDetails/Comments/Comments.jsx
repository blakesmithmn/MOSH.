import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Paper, Card, CardContent, Typography, Button, ButtonGroup, CardActions, Box, Grid, CardMedia, FormGroup, TextField, Container, Avatar, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Avatars from '../../Avatar/Avatar';
import './Comments.css'


function Comments({ eventID }) {
    // user state - [{},{}]
    const user = useSelector((store) => store.user);
    // comments state - [{},{}]
    const comments = useSelector((store) => store.comments);

    const dispatch = useDispatch();
    const history = useHistory();
    // local state to set the comment text
    const [comment, setComment] = useState('');

    useEffect(() => {
        // useEffect to fetch comment data from the server per event
        dispatch({
            type: 'SAGA_FETCH_COMMENTS',
            payload: eventID
        })
        console.log(eventID)
    }, []);

    // DISPATCH TO FETCH COMMENTS FROM USERS_COMMENTS
    // DISPATCH TO POST COMMENT TO USERS_COMMENTS
    // comment form component
    const handleCommentPost = async (event) => {
        event.preventDefault();
        const userID = user.id;
        console.log('COMMENT TEXT AND EVENT ID', userID, comment, eventID);
        await dispatch({
            type: 'SAGA_ADD_COMMENT',
            payload: { userID, comment, eventID }
        })
        setComment('');
    }

    const profilePush = (profileID) => {
        console.log(profileID);
        history.push(`/profile/${profileID}`)
    }

    return (
        <Card>
            <CardContent>
                <Typography variant='h2'>COMMENTS</Typography>
            </CardContent>
            <CardContent >
                <Grid container direction='column' className='comments' spacing={2}>
                    <Grid item xs={12}>
                        {comments.map(commentItem => (
                            <Stack direction='row' ml={-9} mb={2} spacing={1} key={commentItem.id} onClick={() => profilePush(commentItem.user_id)}
                                justifyContent="flex-start"
                                alignItems="flex-start">

                                <Avatars username={commentItem} />

                                <Typography component='span'>{commentItem.comment}</Typography>

                            </Stack>
                        ))}
                    </Grid>
                </Grid>
            </CardContent>
            <CardContent>
                <form onSubmit={handleCommentPost}>
                    <TextField size='small' placeholder='Write a comment ...' fullWidth onChange={(event) => setComment(event.target.value)} value={comment}></TextField>
                    <Button variant='contained' color='secondary' type='submit' sx={{ margin: 1 }}>Submit</Button>
                </form>
            </CardContent>
        </Card>

    )
}

export default Comments;