// components/Sidebar.js
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Box,
  IconButton,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  BrandingWatermark as BrandingWatermarkIcon,
  People as PeopleIcon,
  Work as WorkIcon,
  Camera as CameraIcon,
  ContactMail as ContactMailIcon,
  Public as PublicIcon,
  PrivacyTip as PrivacyTipIcon,
  Copyright as CopyrightIcon,
  ArrowForward as ArrowForwardIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import StayCurrentPortraitIcon from '@mui/icons-material/StayCurrentPortrait';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountMenu from './adminProfile';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, link: '/dashboard' },
  { text: 'Home', icon: <HomeIcon />, link: '/home' },
  { text: 'About Us', icon: <InfoIcon />, link: '/about-us' },
  { text: 'Our Brands', icon: <BrandingWatermarkIcon />, link: '/our-brands' },
  
  { text: 'Investors', icon: <PeopleIcon />, link: '/investors' },
  { text: 'Careers', icon: <WorkIcon />, link: '/careers' },
  { text: 'Media', icon: <CameraIcon />, link: '/media' },
  { text: 'Sustainability', icon: <CameraIcon />, link: '/sustainability' },
  { text: 'Blogs', icon: <StayCurrentPortraitIcon />, link: '/blogs' },
  { text: 'Contact Us', icon: <ContactMailIcon />, link: '/contact-us' },
  {text:'Settings',icon: <SettingsIcon/>, link:'/settings'}

  // { text: 'Social Media', icon: <PublicIcon />, link: '/social-media' },
  // { text: 'Privacy Policy', icon: <PrivacyTipIcon />, link: '/privacy-policy' },
  // { text: 'Copy Rights', icon: <CopyrightIcon />, link: '/copy-rights' },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const drawerWidth = isCollapsed ? 60 : 250;

  return (
   <Box>
     <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#FFFBF6',
          color: '#333',
          transition: 'width 0.3s',
        },
        display:"flex",
      }}
      variant="permanent"
      anchor="left"
    >
      {/* Toggle Button */}
      <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
        <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? <MenuIcon sx={{ color: '#333' }} /> : <ArrowForwardIcon sx={{ color: '#333' }} />}
        </IconButton>
      </Box>
      <Divider />

      {/* Sidebar Items */}
      {/*  */}
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
    <Box sx={{display:'f;e'}}></Box>
   </Box>
  );
};

export default Sidebar;
