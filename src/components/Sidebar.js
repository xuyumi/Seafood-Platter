import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Drawer, CssBaseline, AppBar, Toolbar, List, Divider, IconButton, Typography, Collapse} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import FilterIcon from '@material-ui/icons/Filter';
import css from '../App.css';
import Homepage from './Homepage';
import SeeAll from './SeeAll';
import SeeFarmed from './SeeFarmed';
import SeeWild from './SeeWild';
import ContactUs from './ContactUs';
import WavesIcon from '@material-ui/icons/Waves';
import EcoIcon from '@material-ui/icons/Eco';
import mario from './mario.mp3'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#181818"
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: 0,
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  listItemHover: {
    "&:hover": {
      backgroundColor: "#3B3B3B !important"
    }
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [home,setHome] = React.useState(true);
  const [see, setSee] = React.useState(false);
  const [contact, setContact] = React.useState(false);
  const [filters, openFilters] = React.useState(false);
  const [farm, setFarm] = React.useState(false);
  const [wild, setWild] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const gotoHome = (event) => {
    console.log("Go to Home");
    setHome(true);
    setSee(false);
    setContact(false);
    setWild(false);
    setFarm(false);
  };

  const gotoSeeAll =(event) => {
    console.log("Go to See All: ");
    setHome(false);
    setSee(true);
    setContact(false);
    setWild(false);
    setFarm(false);
  };

  const gotoContactUs =(event) => {
    console.log("Go to Contact Us");
    setHome(false);
    setSee(false);
    setContact(true);
    setWild(false);
    setFarm(false);
  };

  const gotoFarm = event => {
    setHome(false);
    setSee(false);
    setContact(false);
    setWild(false);
    setFarm(true);
  }

  const gotoWild = event => {
    setHome(false);
    setSee(false);
    setContact(false);
    setWild(true);
    setFarm(false);
  }

  const handleClick = () => {
    openFilters(!filters);
  };


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        style={{backgroundColor: '#181818' }}>
      
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} style={{fontFamily: ['Yeseva One', 'cursive']}}>
          The Seafood Platter
        </Typography>
        </Toolbar>
        
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon style={{fill: "white"}}/> : <ChevronRightIcon  style={{fill: "white"}}/>}
          </IconButton>
        </div>
        <Divider />
        <List style={{color:"white"}}>
          {/* <------------- HOME PAGE -------------> */}
          <ListItem button className={classes.listItemHover} onClick={gotoHome}>
            <ListItemIcon><HomeIcon style={{fill: "white"}}/></ListItemIcon>
            <ListItemText primary={'Home'} />
          </ListItem>
          {/* <------------- SEE ALL PAGE -------------> */}
          <ListItem button className={classes.listItemHover} onClick={gotoSeeAll}>
            <ListItemIcon><MenuBookIcon style={{fill: "white"}}/></ListItemIcon>
            <ListItemText primary={'See All'} />
          </ListItem>
          {/* <------------- SPECIFIC SEARCH PAGE -------------> */}
          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <FilterIcon style={{fill: "white"}}/>
            </ListItemIcon>
            <ListItemText primary="Filters" />
            {filters ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={filters} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested} onClick={gotoWild}>
                <ListItemIcon>
                  <WavesIcon style={{fill: "white"}} />
                </ListItemIcon>
                <ListItemText primary="Wild" />
              </ListItem>
              <ListItem button className={classes.nested} onClick={gotoFarm}>
                <ListItemIcon>
                  <EcoIcon style={{fill: "white"}} />
                </ListItemIcon>
                <ListItemText primary="Farmed" />
              </ListItem>
            </List>
          </Collapse>
          {/* <------------- CONTACT US PAGE -------------> */}
          <ListItem button className={classes.listItemHover} onClick={gotoContactUs}>
            <ListItemIcon><ContactMailIcon style={{fill: "white"}}/></ListItemIcon>
            <ListItemText primary={'Contact Us'} />
          </ListItem><br/><br/><br/>
          <ListItem>
            {/* Disclaimer: Music from Mario, which is owned by Nintendo */}
            <audio controls loop>
              <source src={mario} type="audio/mpeg"/>
              Your browser does not support the audio element.
            </audio>
          </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        
        {/* <-------------- ALL PAGES ----------------> */}
        { home ? <Homepage /> : null }
        { see ? <SeeAll/> : null }
        { farm ? <SeeFarmed/> : null }
        { wild ? <SeeWild/> : null }
        { contact ? <ContactUs /> : null }
      </main>
    </div>
  );
}