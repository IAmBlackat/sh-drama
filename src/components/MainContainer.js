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
        axios.get('http://localhost:5000/cdn')
        .then( res => console.log(res.data))
    }, [])
    // var playerInstance = jwplayer("myVideo");
    // var countplayer = 1;
    // var countcheck = 0;
    // var current_time  = 0;
    // playerInstance.setup({
    //     sources:[{file: 'https://storage.googleapis.com/sacred-entry-315002/W3VKETS_ZPF2/22a_1624550408_4584.mp4',label: 'HD P','type' : 'mp4'}]
    // }); https://andhaetg.github.io/plyr/env.js

    return (
        <Container maxWidth="xl" >
            <Router>
                <iframe 
                    src="https://animixplay.to/api/liveTkRVNE5BPT1MVFhzM0dyVTh3ZTlPVGtSVk5FNUJQVDA9"
                    
                />
                {/* <video 
                    src="https://storage.googleapis.com/sacred-entry-315002/W3VKETS_ZPF2/22a_1624550408_4584.mp4"
                    width="100%"
                    height={400}
                    controls
                /> */}
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