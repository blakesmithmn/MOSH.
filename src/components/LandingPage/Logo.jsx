import moshlogo from './moshlogolight.png'
import { useHistory } from 'react-router-dom';
import { Paper, Card, CardContent, Typography, Button, ButtonGroup, CardActions, Box, Grid, CardMedia, FormGroup, TextField, Container, IconButton } from '@mui/material';


function Logo() {
    const history = useHistory();

    return (
        <>
            <img src={moshlogo} id='homelogo' />
            <Grid item>
                <Button variant='contained' sx={{ 'background-color': '#FFFFFF', color: '#000000' }} onClick={() => history.push('/home/login')}>ENTER</Button>
            </Grid>
        </>
    )
}

export default Logo;