import React from 'react'
import { Drawer, Hidden, SwipeableDrawer, Toolbar} from '@mui/material';

import SidenavData from './SidenavData';

function Sidenav(props) {
    return (
        <>
            <Hidden mdUp>
                <SwipeableDrawer
                    anchor='left'
                    variant= 'temporary'
                    open={props.isOpen}
                    onClose={props.drawerHandler}
                    onOpen={props.drawerHandler}
                    ModalProps={{keepMounted:true}}
                    sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                >
                    <SidenavData  drawerHandler={props.drawerHandler} />
                </SwipeableDrawer>
            </Hidden>
            <Hidden mdDown>
                <Drawer 
                    variant='permanent'
                    open
                >
                    <Toolbar />
                    <SidenavData/>
                </Drawer>
            </Hidden>
        </>
    )
}

export default Sidenav
