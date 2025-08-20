import React from 'react'
import { NavLink } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Box } from '@mui/system';
import { Dashboard, Campaign } from '@mui/icons-material';


function SidenavData(props) {
  const sidenavData = [
    { 'label': 'Dashboard', 'link':'/', 'icon': <Dashboard /> },
    { 'label': 'Campaign', 'link':'/campaign', 'icon': <Campaign /> },
  ]

  return (
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={props.drawerHandler}
        onKeyDown={props.drawerHandler}
      >
        <List>
          {sidenavData.map((data, index) => (
            <NavLink key={data.label + index} to={data.link} exact className={classes.link} activeClassName={classes.activeLink}>
              <ListItem button>
                <ListItemIcon>
                  {data.icon}
                </ListItemIcon>
                <ListItemText primary={data.label} />
              </ListItem>
            </NavLink>
          ))}
        </List>
      </Box>
  )
}

export default SidenavData
