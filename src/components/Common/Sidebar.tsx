import { Dashboard, PeopleAlt } from '@mui/icons-material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

export function Sidebar() {
  const linkStyle = {
    color: 'inherit',
    textDecoration:'none',
    'a.active > li': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)'
    },
  }
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          <NavLink to="/dashboard" style={({ isActive }) => {
              return {
                display: "block",
                margin: "1rem 0",
                color: "inherit",
                textDecoration: "none",
                backgroundColor: isActive ? "rgba(0,0,0,0.08)" : ""
              };
            }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
          </NavLink>

          <NavLink to="/students" style={({ isActive }) => {
              return {
                display: "block",
                margin: "1rem 0",
                color: "inherit",
                textDecoration: "none",
                backgroundColor: isActive ? "rgba(0,0,0,0.08)" : ""
              };
            }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PeopleAlt />
                </ListItemIcon>
                <ListItemText primary="Students" />
              </ListItemButton>
            </ListItem>
          </NavLink>
        </List>
      </nav>
    </Box>
  );
}
