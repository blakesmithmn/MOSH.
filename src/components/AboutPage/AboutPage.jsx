import React from 'react';
import { Paper, Card, CardContent, Typography, Button, ButtonGroup, CardActions, Box, Grid, CardMedia, FormGroup, TextField, Container, Avatar, Stack, ListItem, ListItemText, List } from '@mui/material';
import photo from './me.jpg';
import qrcode from './qrcode.JPG';
// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <Grid container spacing={4} alignItems="flex-start">
      <Grid item xs={12} md={2}>
        <Card>
          <CardMedia component='img' image={photo} />
          <Typography variant='h4'>Special Thanks:</Typography>
          <Typography>Thanks to everyone in the L'Engle cohort, our Instructor Matt, the support staff here at Prime, and Caffeine for making this all possible.</Typography>
        </Card>


      </Grid>
      <Grid item xs={12} md={4}>
        <Card>

          <Typography variant='h3'>Technologies Used:</Typography>
          <List>
            <ListItem>
              <ListItemText primary='React' />
            </ListItem>
            <ListItem>
              <ListItemText primary='Material-UI' />
            </ListItem>
            <ListItem>
              <ListItemText primary='JavaScript' />
            </ListItem>
            <ListItem>
              <ListItemText primary='Node.js' />
            </ListItem>
            <ListItem>
              <ListItemText primary='Express' />
            </ListItem>
            <ListItem>
              <ListItemText primary='Redux & Redux-Saga' />
            </ListItem>
            <ListItem>
              <ListItemText primary='PostgreSQL' />
            </ListItem>
            <ListItem>
              <ListItemText primary="3rd Party API's from SeatGeek & TicketMaster" />
            </ListItem>
            <ListItem>
              <ListItemText primary='SweetAlerts' />
            </ListItem>
            <ListItem>
              <ListItemText primary='HTML/CSS' />
            </ListItem>
          </List>


        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <Typography variant='h3'> Challenges & Next Steps:</Typography>
          <CardContent>
            <List>
              <ListItem>
                <ListItemText primary="Dealing with multiple large API's to fill the niche data needed for the app" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Creating a responsive product that can be used at home and on the go" />
              </ListItem>
            </List>

            <List>
              <ListItem>
                <ListItemText primary="Adding functionality so users can 'Friend' someone and view what events they are attending" />
              </ListItem>
              <ListItem>
                <ListItemText primary="A recommended list of upcoming events on the home view per user" />
              </ListItem>
            </List>




          </CardContent>
        </Card>

      </Grid>


      <Grid item xs={12} md={2}>
        <Card>
          <Typography variant='h4'>LinkedIn</Typography>
          <Typography>If you have any questions about the project, or my next steps feel free to connect with me on LinkedIn!</Typography>
          <CardMedia component='img' image={qrcode} />
        </Card>
      </Grid>
    </Grid>




  );
}

export default AboutPage;
