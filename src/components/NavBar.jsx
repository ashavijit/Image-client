import React,{useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function NavBar({user}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logout = () => {
		window.open(`${process.env.REACT_APP_SERVER_URL}/auth/logout`, "_self");
	};
    const toAccount = ()=>{
        navigate("/myaccount")
    }
    const toHome = ()=>{
        navigate("/")
    }
    const toDashboard = ()=>{
        navigate("/dashboard")
    }
    return (
        <>
            <header className='header'>
                {
                    user?
                        <>
                            <div className="avatar">
                                <Tooltip title="Account settings">
                                    <IconButton
                                        onClick={handleClick}
                                        size="small"
                                        sx={{ ml: 2 }}
                                        aria-controls={open ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                    >
                                        <Avatar sx={{ width: 50, height: 50 }} alt="avatar_image" src={user.picture}>{user.name.split(" ")[0][0]}</Avatar>
                                        
                                    </IconButton>
                                </Tooltip>
                            </div>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem onClick={toHome}>
                                    <ListItemIcon>
                                        <HomeIcon sx={{ width: 20, height: 20 }} fontSize="small" />
                                    </ListItemIcon>
                                    Home
                                </MenuItem>
                                <MenuItem onClick={toDashboard}>
                                    <ListItemIcon>
                                        <DashboardIcon sx={{ width: 20, height: 20 }} fontSize="small" />
                                    </ListItemIcon>
                                    Dashboard
                                </MenuItem>
                                <MenuItem onClick={toAccount}>
                                    <ListItemIcon>
                                        <AccountCircleIcon sx={{ width: 20, height: 20 }} fontSize="small" />
                                    </ListItemIcon>
                                    My Account
                                </MenuItem>
                                <MenuItem onClick={logout}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </>
                    :
                    <>
                        <div className="auth">
                            <Link to="/signin">Sign In</Link>
                            <Link to="/signup">
                                <Button variant="contained" color="secondary">
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    </>

                }
            </header>
        </>
    )
}
