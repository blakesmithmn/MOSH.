import { useEffect, useState } from 'react';

import { BottomNavigation, BottomNavigationAction } from '@mui/material';
// MUI IMPORTS

import EventIcon from '@mui/icons-material/Event';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

function MobileNav() {
    const [value, setValue] = useState(0);


    return (
        <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            sx={{ display: { xs: 'block', sm: 'block', md: 'none', position: 'fixed', bottom: 0, left: 0, right: 0, color: 'primary' } }}

        >
            <BottomNavigationAction label="Home" icon={<HomeIcon />} />
            <BottomNavigationAction label="My Events" icon={<EventIcon />} />
            <BottomNavigationAction label="Search" icon={<SearchIcon />} />
            <BottomNavigationAction label="Profile" icon={<AccountBoxIcon />} />
        </BottomNavigation>
    )
}

export default MobileNav;