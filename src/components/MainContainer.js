import { Container, Divider, makeStyles } from '@material-ui/core'
import React from 'react'
import { Appbar } from './Appbar'
import Content from './Content'
import { Sidenav } from './Sidenav'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

const styles = makeStyles( (theme) => ({
    section: {
        marginTop: theme.spacing(2),
    }
}))

export default function MainContainer() {
    const classes = styles()
    return (
        <Container maxWidth="xl" >
            <Appbar />
            
            <div className={classes.section} >
                <Router>
                    <Sidenav />
                    <Divider orientation="vertical" />
                    <Content />
                </Router>
            </div>

        </Container>
    )
}