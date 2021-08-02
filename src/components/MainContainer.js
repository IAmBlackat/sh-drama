import { Container, makeStyles } from '@material-ui/core'
import React, { useEffect } from 'react'
import { Appbar } from './Appbar'
import Content from './Content'
import { Sidenav } from './Sidenav'
import { BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios'

const styles = makeStyles( (theme) => ({
    section: {
        marginTop: theme.spacing(2),
    }
}))

export default function MainContainer() {
    const classes = styles()
    useEffect( () => {
        axios.post("https://senhai-drama-server.vercel.app/ai/api/v1/drama/kdramawatch", {
            epID: "the-devil-judge-2021-episode-1"
        })
        .then( res => {
            console.log(res.data.results[0].split("'")[1])
        })
        .catch( e => console.error(e))
    }, [])
    return (
        <Container maxWidth="xl" >
            <Router>
                <Appbar />
                
                <div className={classes.section} >
                        <Sidenav />
                        {/* <Divider orientation="vertical" /> */}
                        <Content />
                </div>
            </Router>
        </Container>
    )
}