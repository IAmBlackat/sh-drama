import React from 'react'
import { AppBar, Button, IconButton, makeStyles, TextField, Toolbar, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { color } from '../utils/color'

const styles = makeStyles( (theme) => ({
    appbar: {
        //344246
        backgroundColor: '#303030',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        
    },
    menuBtn: {
        marginRight: theme.spacing(2),
        "&:hover": {
            color: color.primary,
        }
    },
    title: {
        marginRight: theme.spacing(3)
    },
    search: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    searchBtn: {
        // color: 'white',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        backgroundColor: color.primary,
        "&:hover": {
            color: 'white',
            backgroundColor: '#121212',
            transition: 'all 0.8s'
        }
    }
}))

export const Appbar = () => {
    const classes = styles()

    return (
        <AppBar position="static" className={classes.appbar} >
            <Toolbar>
                <IconButton
                    className={classes.menuBtn}
                >
                    <MenuIcon />
                </IconButton>

                <Typography className={classes.title} variant="h6" noWrap >
                    Senhai-Drama
                </Typography>

                <form style={{ display: 'flex' }} >
                    <TextField 
                        className={classes.search}
                        placeholder="Search drama title..."
                        variant="outlined"
                        size="small"
                        inputProps={{ 
                            style: { 
                                paddingTop: 10, 
                                paddingBottom: 10, 
                                "&:active": { backgroundColor: 'black' },
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0,
                            } 
                        }}
                    />
                    <Button className={classes.searchBtn} variant="contained" size="medium" >
                        <SearchIcon />
                    </Button>
                </form>
            </Toolbar>
        </AppBar>
    )
}