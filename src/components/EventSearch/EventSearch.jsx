import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

// COMPONENTS & CSS
import EventSearchItem from './EventSearchItem';
import SearchBar from './SearchBar';
import './EventSearch.css'

// MUI IMPORTS
import { Paper, Card, CardContent, Typography, Button, CardActions, Box, Grid, CardMedia, FormGroup, TextField, Container } from '@mui/material';


function EventSearch() {
    const searchResults = useSelector((store) => store.search);
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
                <Grid item xs={12} sm={6}>
                    <SearchBar />
                    {/* <Button onClick={(event) => submitSearch(event)}>Search</Button> */}

                </Grid>

            </Grid>
            {searchResults.length > 0 ?
                <>

                    <h4>Concert Search Results:</h4>

                    <Grid container spacing={4}>


                        {searchResults.map(concert => (

                            <EventSearchItem concert={concert} key={concert.id} />

                        ))}
                    </Grid>
                </>


                :

                // <Grid item xs={12}>
                //     <Card>
                //         <Typography variant='h4'>
                //             Search for a Genre, Venue, or Artist!
                //         </Typography>

                //     </Card>
                // </Grid>

                null
            }
        </>
    )
}

export default EventSearch;