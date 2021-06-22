import React from 'react'
// import Skeleton from '@material-ui/lab/Skeleton';
import { CircularProgress, makeStyles, Typography } from '@material-ui/core'
import { color } from '../../utils/color'

const styles = makeStyles( (theme) => ({
    root: {
        height: '50%',
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    progress: {
        color: color.lightBlue
    }
}))

const Loading = () => {
    const classes = styles()
    return(
        <div className={classes.root} >
            <CircularProgress className={classes.progress}  />
            <Typography>
                Loading...
            </Typography>
        </div>
    )
}

export default Loading