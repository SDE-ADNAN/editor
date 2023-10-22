import React from 'react'
import { AppBar, Hidden, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';

import UserMenu from './UserMenu';
import { Link } from "react-router-dom";

function Navbar(props) {
    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <Hidden smUp>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick = {props.drawerHandler}
                    >
                        <MenuIcon />
                    </IconButton>
                </Hidden>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                   <Link to='/'  style={{ textDecoration: "none" , color: "white" }}> Editor </Link>
                </Typography>
                <UserMenu />
            </Toolbar>
        </AppBar>
    )
}

export default React.memo(Navbar);
