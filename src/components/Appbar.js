import React, { useState } from 'react'
import { AppBar, Button, IconButton, makeStyles, TextField, Toolbar, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { color } from '../utils/color'
import { useHistory } from 'react-router-dom';
// import logo from '../asset/logo.png'

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
        marginRight: theme.spacing(3),
        // paddingRight: theme.spacing(2.6),
        cursor: 'pointer',
        position: 'relative',
        zIndex: 99,
    },
    logo: {
        position: 'absolute',
        top: 2,
        right: 2,
        width: 20,
        height: 20,
        zIndex: 100,
        transform: 'rotate(35deg)'
    },
    search: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    searchBtn: {
        // color: 'white',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        backgroundColor: color.lightBlue,
        "&:hover": {
            color: color.lightBlue,
            backgroundColor: '#121212',
            transition: 'all 0.3s'
        }
    }
}))

export const Appbar = () => {
    const classes = styles()
    const [ query, setQuery ] = useState('')

    const history = useHistory()

    const handleSearch = (e) => {
        e.preventDefault()
        if (query.trim() !== '') {
            history.push(`/search/${query}`)
        }
    }

    return (
        <AppBar position="static" className={classes.appbar} >
            <Toolbar>
                <IconButton
                    className={classes.menuBtn}
                >
                    <MenuIcon />
                </IconButton>

                <Typography onClick={()=>history.push('/')} className={classes.title} variant="h6" noWrap >
                    Ate's K-Drama
                    {/* <img className={classes.logo} src={logo} alt="" /> */}
                </Typography>

                <form onSubmit={handleSearch} style={{ display: 'flex' }} >
                    <TextField 
                        className={classes.search}
                        placeholder="Search drama title..."
                        variant="outlined"
                        size="small"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
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
                    <Button type="submit" className={classes.searchBtn} variant="contained" size="medium" >
                        <SearchIcon />
                    </Button>
                </form>
            </Toolbar>
        </AppBar>
    )
}