import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import EventSearchItem from './EventSearchItem';
import { styled, alpha } from '@mui/material/styles';

import { InputBase, Paper, Card, CardContent, Typography, Button, CardActions, Box, Grid, CardMedia, FormGroup, TextField, Container } from '@mui/material';
// import './EventSearch.css'
import { useHistory, useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';





function SearchBar() {

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        color: 'black',
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '8ch',
                '&:focus': {
                    width: '34ch',
                },
            },
        },
    }));

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
            {/* <TextField
                    id='outlined-basic'
                    size='small'
                    label='Search Events & Genres'
                    variant='outlined'
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    sx={{ color: 'white' }}
                /> */}

            <form onSubmit={submitSearch} className='SearchBar' onKeyDown={(event) => keyPress(event)}>
                <Search>
                    <SearchIconWrapper >
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search ... Events, Genres & Venues"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
            </form>

        </>
    )
}

export default SearchBar;