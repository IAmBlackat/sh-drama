import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Continue } from './Continue'
import { Carousel } from './Carousel'
import { StartWatching } from './StartWatching'

const styles = makeStyles( (theme) => ({
    root: {
        height: "100%",
        width: "100%",
        // position: 'relative'
        // backgroundColor: '#303030'
    }
}))

export default function Home() {
    const classes = styles()
    return (
        <div className={classes.root} >
            <Continue />
            {/* <StartWatching /> */}
            <Carousel />
        </div>
    )
}