// components/Sidebar.js
import React, { useState } from 'react';
import Link from 'next/link';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, Typography, Avatar, Box, IconButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import CameraIcon from '@mui/icons-material/Camera';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PublicIcon from '@mui/icons-material/Public';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import CopyrightIcon from '@mui/icons-material/Copyright';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MenuIcon from '@mui/icons-material/Menu';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, link: '/dashboard' },
  { text: 'Home', icon: <HomeIcon />, link: '/home' },
  { text: 'About Us', icon: <InfoIcon />, link: '/about-us' },
  { text: 'Our Brands', icon: <BrandingWatermarkIcon />, link: '/our-brands' },
  { text: 'Investors', icon: <PeopleIcon />, link: '/investors' },
  { text: 'Careers', icon: <WorkIcon />, link: '/careers' },
  { text: 'Media', icon: <CameraIcon />, link: '/media' },
  { text: 'Contact Us', icon: <ContactMailIcon />, link: '/contact-us' },
  { text: 'Social Media', icon: <PublicIcon />, link: '/social-media' },
  { text: 'Privacy Policy', icon: <PrivacyTipIcon />, link: '/privacy-policy' },
  { text: 'Copy Rights', icon: <CopyrightIcon />, link: '/copy-rights' },
];

const Sidebar = () => {
  const drawerWidth = 250;
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isCollapsed ? 60 : drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#FFFBF6',
          color: '#fff',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {/* Profile Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
        
        <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? <MenuIcon sx={{ color: '#333' }} /> : <ArrowForwardIcon sx={{ color: '#333' }} />}
        </IconButton>
      </Box>
      <Divider />

      {/* Sidebar Items */}
      <List>
        {menuItems.map((item, index) => (
          <Link key={index} href={item.link} passHref>
            <ListItem button component="a" sx={{ backgroundColor: '#FFFBF6', '&:hover': { backgroundColor: '#e2e2e2' } }}>
              <ListItemIcon sx={{ color: '#333' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} sx={{ color: '#333', display: isCollapsed ? 'none' : 'block' }} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

export default Sidebar;
