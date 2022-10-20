import { Paper, Card, CardContent, Typography, Button, ButtonGroup, CardActions, Box, Grid, CardMedia, FormGroup, TextField, Container, Avatar, IconButton } from '@mui/material';
import { useHistory } from 'react-router-dom';


function NoEvents() {
    const history = useHistory();
    const pushSearch = () => {
        history.push('/search');
    }
    return (
        <>
            <Grid item xs={12}>
                <Card>
                    <Typography variant='h3'>
                        No Events Yet
                    </Typography>
                    <Typography>
                        Let's head on over to <Button onClick={pushSearch}>SEARCH</Button> to find some!
                    </Typography>
                </Card>
            </Grid>
        </>
    )
}

export default NoEvents;