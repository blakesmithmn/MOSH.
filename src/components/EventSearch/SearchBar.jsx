import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import EventSearchItem from './EventSearchItem';
import { Paper, Card, CardContent, Typography, Button, CardActions, Box, Grid, CardMedia, FormGroup, TextField, Container } from '@mui/material';
// import './EventSearch.css'
import { useHistory, useLocation } from 'react-router-dom';



function SearchBar() {
    const searchResults = useSelector((store) => store.search);
    const user = useSelector((store) => store.user);

    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const submitSearch = (event) => {
        event.preventDefault();
        dispatch({
            type: 'SAGA_SEARCH_EVENTS',
            payload: { search: search, zipcode: user.zipcode }
        })
        setSearch('');
        history.push('/search')
    }

    const keyPress = (event) => {
        if (event.keyCode === 13) {
            submitSearch()
        }
    }



    return (
        <>
            {/* <p>RECOMMENDATIONS REQUESTS COULD BE DOPE FOR HOME PAGE</p> */}



            <form onSubmit={submitSearch} className='SearchBar' onKeyDown={(event) => keyPress(event)}>
                <TextField
                    id='outlined-basic'
                    size='small'
                    label='Search'
                    variant='outlined'
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />
            </form>

        </>
    )
}

export default SearchBar;