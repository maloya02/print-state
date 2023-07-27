import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Logo from '../../img/logo.jpg';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

const NavBar = () => {
  const pages = [
    { title: 'How it works', path: '/' },
    { title: 'Shop', path: '/Ecom' },
    { title: 'Customize', path: '#' },
  ];

  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    console.log('navbar render');
    const token = localStorage.getItem('token');
    console.log(token);
    console.log(isLogin);

    if (token) {
      setIsLogin(true)
      console.log(isLogin);

      const accessToken = JSON.parse(atob(token.split('.')[1]))
      console.log(accessToken);
      // if(accessToken.iat * 1000 <  Date.now()) {
      //   // localStorage.removeItem('token');
      //   setIsLogin(false)
      //   console.log(isLogin);
      // }
    } else {
      // localStorage.removeItem('token');
      setIsLogin(false)
      console.log(isLogin);
    }

  });


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/Login')
  }

  return (
    <AppBar position="sticky" sx={{ background: 'white' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo and Page Title */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: '#000000',
            }}
          >
            <img
              src={Logo}
              alt="Your Logo"
              style={{ width: 50, height: 50, borderRadius: '5px', marginRight: 8 }}
            />
            <Typography variant="h4" noWrap sx={{ fontWeight: 700 }}>
              print<span className='text-pink'>State</span>
            </Typography>
          </Box>

          {/* Links (on the left side) */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' }, justifyContent: 'Center' }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                component={Link}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{ mx: 2, color: '#000000', display: { xs: 'none', md: 'block' } }}

              >
                {page.title}
              </Button>
            ))}
          </Box>

          {/* Login, Sign-up buttons, and Tooltip (on the right side) */}

          {isLogin ?

            <Box sx={{ flexGrow: 0,display: { xs: 'none', md: 'flex' } }}>
              <Link to="/Checkout">
                <ShoppingCartCheckoutIcon fontSize="large" />
              </Link>
              
              <Button
                component={Link}
                to="/Login"
                onClick={handleLogout}
                variant="contained"
                color="primary"
                sx={{
                  background: '#F8567B',
                  '&:hover': {
                    backgroundColor: '#fff',
                    border: '2px solid #F8567B',
                    color: '#F8567B'
                  },

                  mr: 2,
                }}
              >
                Logout
              </Button>
            </Box>

            :
            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>

              <Button
                component={Link}
                to="/Login"
                onClick={handleCloseNavMenu}
                variant="contained"
                color="primary"
                sx={{
                  background: '#F8567B',
                  '&:hover': {
                    backgroundColor: '#fff',
                    border: '2px solid #F8567B',
                    color: '#F8567B'
                  },

                  mr: 2,
                }}

              >
                Login
              </Button>
              <Button
                component={Link}
                to="/SignUp"
                onClick={handleCloseNavMenu}
                variant="contained"
                color="secondary"
                sx={{
                  background: '#0C0C0C',
                  '&:hover': {
                    backgroundColor: '#FFF',
                    border: '2px solid #0C0C0C',
                    color: '#0C0C0C'
                  },
                  mr: 2,
                }}
              >
                Sign-up
              </Button>
              {/* <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="BianBian" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip> */}
            </Box>
          }


          {/* Mobile view menu (hamburger menu) */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', justifyContent: 'flex-end' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="#000000"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  <Typography
                    component={Link}
                    to={page.path}
                    variant="body1"

                  >
                    {page.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
