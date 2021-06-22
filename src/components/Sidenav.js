import React from 'react'
import { IconButton, makeStyles, Typography } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home';
// import WhatshotIcon from '@material-ui/icons/Whatshot';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import HistoryIcon from '@material-ui/icons/History';
import { color } from '../utils/color'
import { Link, useLocation } from 'react-router-dom'

const styles = makeStyles( (theme) => ({
    root: {
        float: 'left', 
        display: 'flex', 
        flexDirection: 'column',
        marginLeft: theme.spacing(1.5),
        // borderRight: '1px solid rgba(255,255,255,0.2)',
        height: "85vh"
    },
    iconBtn: {
        display: 'flex',
        flexDirection: 'row',
        "&:hover": {
            color: color.primary,
            backgroundColor: 'transparent',
            transition: 'all 0.5s'
        },
    },
    active: {
        color: color.primary
    }
}))

export const Sidenav = () => {
    const classes = styles()

    const p = useLocation()

    const Nav = ({ icon, title, component, to }) => {
        return (
            <IconButton 
                component={component} 
                to={to} 
                className={`${classes.iconBtn} ${p.pathname === to && classes.active}`} 
                disableFocusRipple 
                disableRipple 
            >
                <div>
                    {icon}
                    <Typography variant="body2" >{title}</Typography>
                </div>
            </IconButton>
        )
    }

    return (
        <div className={classes.root} >
           <Nav icon={<HomeIcon />} title="Home" component={Link} to="/"  />
           <Nav icon={<HistoryIcon />} title="History" component={Link} to="/history" />
           <Nav icon={<StarHalfIcon />} title="Popular" component={Link} to="/popular"  />
        </div>
    )
}