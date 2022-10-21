import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav" sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
      <Link to="/home">
        <h2 className="nav-title">MOSH.</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <>
            <Link className="navLink" to="/home/login">
              Login / Register
            </Link>
            <Link className="navLink" to="/about">
              About
            </Link>
          </>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>

            <Link className="navLink" to="/search">
              Search
            </Link>

            <Link className="navLink" to={`/profile/${user.id}`}>
              Profile
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}


      </div>
    </div >
  );
}

export default Nav;
