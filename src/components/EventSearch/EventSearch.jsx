import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import EventSearchItem from './EventSearchItem';
import { Paper, Card, CardContent, Typography, Button, CardActions, Box, Grid, CardMedia, FormGroup, TextField, Container } from '@mui/material';


function EventSearch() {
    const searchResults = useSelector((store) => store.searchResults.searchResults);


    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

    const submitSearch = (event) => {
        event.preventDefault();
        dispatch({
            type: 'SAGA_SEARCH_EVENTS',
            payload: search
        })
        setSearch('');
    }




    return (
        <>
            <h1>Search</h1>
            <form onSubmit={submitSearch}>
                <input type="text" placeholder='event search' onChange={(event) => setSearch(event.target.value)} />
                <button type="submit">Search</button>
            </form>

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