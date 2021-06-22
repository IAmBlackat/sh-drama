import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'

const styles = makeStyles( (theme) => ({
    root: {
        height: '50%',
        width: '100%',
        // backgroundColor: '#303030',
        overflow: 'hidden',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        display: 'flex'
    },
    title: {
        fontWeight: 'bold'
    },
    color: {
        color: 'blue'
    }
}))

export const StartWatching = () => {
    const classes = styles()
    // const img = 'https://cdn.videokvid.com/cover/frightening-cohabitation.png'
    // const img ="https://cdn.videokvid.com/cover/youth-of-may-2021.png"
    // const img = 'https://cdn.videokvid.com/cover/hospital-playlist-2.png'
    return (
        <div className={classes.root} >
            <Typography className={classes.title}  variant="h4" >
                Nothing here yet
            </Typography>
        </div>
    )
}