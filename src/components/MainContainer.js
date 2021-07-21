import { Container, makeStyles } from '@material-ui/core'
import React from 'react'
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