import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Continue } from './Continue'
import { Carousel } from './Carousel'
import { StartWatching } from './StartWatching'
import { useSelector } from 'react-redux'

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
    const history = useSelector( state => state.history )
    return (
        <div className={classes.root} >
            { history.length !== 0 ?  <Continue /> : <StartWatching /> }
            <Carousel />
        </div>
    )
}