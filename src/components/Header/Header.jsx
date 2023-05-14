import React, { useState, useCallback } from 'react';

import Navbar from './Navbar/Navbar';
import Sidenav from './Sidenav/Sidenav'

function Header() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = useCallback(() => {
        setIsDrawerOpen((prevData) => !prevData);
    },[setIsDrawerOpen]);

    return (
        <div>
            <Navbar drawerHandler={toggleDrawer}/>
            <Sidenav isOpen={isDrawerOpen} drawerHandler={toggleDrawer}/>
        </div>
    )
}

export default Header
