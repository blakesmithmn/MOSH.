import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


// COMPONENTS & CSS
import LogOutButton from '../LogOutButton/LogOutButton';
import SearchBar from '../EventSearch/SearchBar';
import ProfilePhoto from '../ProfilePhoto/ProfilePhoto';



// MUI IMPORTS
import { styled, alpha } from '@mui/material/styles';
import { deepOrange, deepPurple, teal, pink, indigo, orange, green, lightBlue } from '@mui/material/colors';
import { Stack, Box, InputBase, Avatar, AppBar, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography, Button } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import MessagesIcon from '@mui/icons-material/Forum';


const drawerWidth = 350;
const navItems = ['Home', 'Profile', 'Event Search', 'Messages'];

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


function Nav(props) {
  const [search, setSearch] = useState('');

  const dispatch = useDispatch();

  const history = useHistory();
  const user = useSelector((store) => store.user);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getUserColor = (user) => {
    switch (user.color) {
      case 'pink':
        return pink[500];
      case 'deepPurple':
        return deepPurple[500];
      case 'indigo':
        return indigo[500];
      case 'teal':
        return teal[500];
      case 'green':
        return green[500];
      case 'orange':
        return orange[500];
      case 'lightBlue':
        return lightBlue[500];
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Avatar sx={{ bgcolor: getUserColor(user), width: 150, height: 150, fontSize: 75, my: 2 }}>{user.id && <p>{user.first_name[0]}</p>} {user.id && <p>{user.last_name[0]}</p>}</Avatar>
      <Divider />
      <List>

        <ListItem >
          <ListItemButton sx={{ textAlign: 'center', mt: 2 }} onClick={(event) => history.push('/user')}>
            <DashboardIcon sx={{ textAlign: 'flex-end', fill: 'whitesmoke' }} />
            <ListItemText primary='Home' sx={{ color: 'white' }} />
          </ListItemButton>
        </ListItem>



        <ListItem >
          <ListItemButton sx={{ textAlign: 'center' }} onClick={() => history.push(`/profile/${user.id}`)}>
            <AccountCircleIcon sx={{ textAlign: 'flex-end', fill: 'whitesmoke' }} />
            <ListItemText primary='Profile' sx={{ color: 'white' }} />
          </ListItemButton>
        </ListItem>



        <ListItem sx={{ testAlign: 'center' }}>
          <ListItemButton sx={{ textAlign: 'center' }} onClick={() => history.push('/search')}>
            <SearchIcon sx={{ textAlign: 'flex-end', fill: 'whitesmoke' }} />
            <ListItemText primary='Event Search' sx={{ color: 'white' }} />
          </ListItemButton>
        </ListItem>

        <ListItem >
          <ListItemButton sx={{ textAlign: 'center' }} onClick={() => history.push('/messages')}>
            <MessagesIcon sx={{ textAlign: 'flex-end', fill: 'whitesmoke' }} />
            <ListItemText primary='Messages' sx={{ color: 'white' }} />
          </ListItemButton>
        </ListItem>

        <ListItem sx={{ mb: 4 }}>
          <ListItemButton sx={{ textAlign: 'center' }} onClick={() => history.push('/settings')}>
            <SettingsIcon sx={{ textAlign: 'flex-end', fill: 'whitesmoke' }} />
            <ListItemText primary='Settings' sx={{ color: 'white' }} />
          </ListItemButton>
        </ListItem>

      </List>
      <LogOutButton />
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const submitSearch = (event) => {
    // event.preventDefault();
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
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <AppBar component="nav" position='sticky' sx={{ display: { xs: 'none', sm: 'none', md: 'block' }, mb: 2 }}>

        {user.id && (
          <Toolbar variant="dense" sx={{ boxShadow: '0px 5px 5px #6e361c89' }}>
            {/* <Button onClick={handleDrawerToggle} color='secondary'></Button> */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mx: 4, py: 1, display: { sm: 'block' } }}
            >
              <MenuIcon sx={{ fontSize: "3rem", color: 'whitesmoke', p: 0, }} />
            </IconButton>
            <Typography
              variant="h4"
              component="div"
              sx={{ flexGrow: 1, pb: 0.5, display: { xs: 'none', sm: 'block' }, textAlign: 'start', color: 'white' }}
            >

              MOSH.


            </Typography>
            {/* <Box sx={{ display: { xs: 'none', sm: 'none' } }}>
              {navItems.map((item) => (
                <Button key={item} sx={{ color: '#fff' }}>
                  {item}
                </Button>
              ))}
            </Box> */}
            <Box sx={{ backgroundColor: 'white', borderRadius: 3 }}>
              <Stack direction='row'>
                <Search onKeyDown={(event) => keyPress(event)}>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search ... Events, Genres & Venues"
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </Search>
                {/* <SearchBar sx={{ mt: -2 }} />
                <SearchIcon /> */}

              </Stack>

            </Box>
          </Toolbar>
        )}
      </AppBar>

      {/*----------SIDE MENU----------*/}
      <Box>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: 'rgb(77, 76, 75, .75)' },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box >
  );
}



export default Nav;