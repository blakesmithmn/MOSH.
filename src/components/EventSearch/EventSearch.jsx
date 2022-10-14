import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import EventSearchItem from './EventSearchItem';
import { Paper, Card, CardContent, Typography, Button, CardActions, Box, Grid, CardMedia, FormGroup, TextField, Container } from '@mui/material';
import './EventSearch.css'


function EventSearch() {
    const searchResults = useSelector((store) => store.search.searchResults);
    const user = useSelector((store) => store.user);

    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

    const submitSearch = (event) => {
        event.preventDefault();
        dispatch({
            type: 'SAGA_SEARCH_EVENTS',
            payload: { search: search, zipcode: user.zipcode }
        })
        setSearch('');
    }




    return (
        <>
            {/* <p>RECOMMENDATIONS REQUESTS COULD BE DOPE FOR HOME PAGE</p> */}


            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Typography variant='h4'>Search:</Typography>
                    <form onSubmit={submitSearch} className='SearchBar'>
                        <TextField
                            id='outlined-basic'
                            size='small'
                            label='Search Events'
                            variant='outlined'
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}

                        />
                        <Button id='button' type='submit' variant='contained'>Search</Button>
                    </form>
                </Grid>

            </Grid>
            <h4>Concert Search Results:</h4>
            <Grid container spacing={4}>


                {searchResults.map(concert => (

                    <EventSearchItem concert={concert} key={concert.id} />

                ))}
            </Grid>
        </>
    )
}

export default EventSearch;