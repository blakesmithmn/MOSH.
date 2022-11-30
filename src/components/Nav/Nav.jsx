import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';

// MUI IMPORTS
import { deepOrange, deepPurple, teal, pink, indigo, orange, green, lightBlue } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { Avatar, AppBar, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography, Button } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import MessagesIcon from '@mui/icons-material/Forum';

const drawerWidth = 350;
const navItems = ['Home', 'Profile', 'Event Search', 'Messages'];

function Nav(props) {
  const location = useLocation();
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
            <Box sx={{ display: { xs: 'none', sm: 'none' } }}>
              {navItems.map((item) => (
                <Button key={item} sx={{ color: '#fff' }}>
                  {item}
                </Button>
              ))}
            </Box>
          </Toolbar>
        )}
        {/*----------NAV TRANSITION----------*/}

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