import React, { useState } from 'react'
import { Box, makeStyles, Typography } from '@material-ui/core'


const styles = makeStyles( (theme) => ({
    root: {
        height: 300,
        width: '100%'
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
    const [ on, a ] = useState(false)

    return (
        <div className={classes.root} >
            <Typography className={[classes.title, on && classes.color]} onClick={() => a(!on)} variant="h4" align="center" >
                Find Your Drama
            </Typography>
        </div>
    )
}