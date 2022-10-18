import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './MobileNav.css'

// MUI IMPORTS
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

function MobileNav() {
    const user = useSelector((store) => store.user);
    const [value, setValue] = useState(0);
    const history = useHistory();



    return (
        <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            sx={{ display: { xs: 'block', sm: 'block', md: 'none', position: 'fixed', bottom: 0, left: 0, right: 0, color: 'primary' } }}
        >
            <BottomNavigationAction label="Home" icon={<HomeIcon />} onClick={(event) => { history.push('/user') }} />
            <BottomNavigationAction label="Search" icon={<SearchIcon />} onClick={(event) => { history.push('/search') }} />
            <BottomNavigationAction label="Profile" icon={<AccountBoxIcon />} onClick={(event) => { history.push(`/profile/${user.id}`) }} />
        </BottomNavigation>
    )
}

export default MobileNav;