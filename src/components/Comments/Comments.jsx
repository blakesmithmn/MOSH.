import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Paper, Card, CardContent, Typography, Button, ButtonGroup, CardActions, Box, Grid, CardMedia, FormGroup, TextField, Container, Avatar } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Avatars from '../Avatar/Avatar';

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
        console.log('COMMENTS LOADED');
        dispatch({
            type: 'SAGA_FETCH_COMMENTS',
            payload: eventID
        })
        console.log(eventID)
    }, []);

    // DISPATCH TO FETCH COMMENTS FROM USERS_COMMENTS
    // DISPATCH TO POST COMMENT TO USERS_COMMENTS
    // comment form component
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
                {comments.map(commentItem => (
                    <div key={commentItem.id} onClick={() => profilePush(commentItem.user_id)}>
                        {/* here is where i'm trying to set unique avatars per user - and use the color data they have tied to their profile */}
                        <Avatars username={commentItem} />
                        <Typography>{commentItem.comment}</Typography>
                    </div>
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