import React, { useRef, useState } from 'react'
import { Button, makeStyles, Typography } from '@material-ui/core'
import Player from 'react-player'
import { color } from '../../utils/color'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useWatch } from '../../hooks/useAxios'
import screenfull from 'screenfull'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import NavigationIcon from '@material-ui/icons/Navigation';


const styles = makeStyles( (theme) => ({
    root: {
        height: '100%',
        padding: theme.spacing(2),
        width: '100%'
    },
    watching: {
        fontWeight: 'bold',
        pointerEvents: 'none'
    },
    title: {
        color: color.lightBlue
    },
    videoWrapper: {
        width: '70%', 
        height: 500, 
        // margin: 'auto',
        marginTop: theme.spacing(2),
        backgroundColor: '#303030',
        borderRadius: 10,
        outline: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        position: 'relative',
        padding: 0
    },
    playBtn: {
        backgroundColor: color.secondary,
        color: color.lightBlue,
        "&:hover": {
            backgroundColor: color.secondary,
            color: color.lightBlue,
        },
        marginRight: 10
    },
}))

export default function Watch() {
    const classes = styles()
    const ref = useRef(null)

    const path = useLocation().pathname
    const id = path.split('/')[2]
    const ep = path.split('/')[4]

    const { result, loading, error, title, lastEp } = useWatch(id, ep)
    // console.log(result[0])
    // const loading = false

    const [ play, setPlay ] = useState(false)

    const history = useHistory()

    const handlePlay = () => {
        setPlay(true)
    }
    const handlePause = () => {
        setPlay(false)
    }
    const handleEnded = async () => {
        await screenfull.exit(ref.current.getInternalPlayer())
        Number(ep) >= Number(lastEp) ? setPlay(false) : history.push(`/watching/${id}/episode/${Number(ep)+1}`)
    }

    if(error) return <h1>Error</h1>

    console.log( ref.current !== null && ref.current.getInternalPlayer())

    return loading ? <Typography className={classes.watching} variant="h5" >Now Loading...</Typography> : (
        <div className={classes.root} >
            <div>
                <Typography className={classes.watching} variant="h5" >Now Watching...</Typography>
                <Typography className={classes.title} variant="h5" >
                    {title} 
                </Typography>
            </div>

            <div>
                <Button onClick={play ? handlePause : handlePlay} className={classes.playBtn} size="small" variant="contained" >
                    {play ? <PauseIcon /> : <PlayArrowIcon />}
                </Button>
                
                <Button
                    size="small"
                    className={classes.playBtn}
                    component={Link}
                    to={`/watching/${id}/episode/${Number(ep)+1}`}
                    disabled={ Number(ep) >= lastEp ? true : false }
                >
                    Next
                    <NavigationIcon 
                        fontSize="small" 
                        style={{ transform: 'rotate(90deg)', marginLeft: 5 }} 
                    />
                </Button>
            </div>

            <div className={classes.videoWrapper} id="video" >
                <Player
                    url={ result.length !== 0 && result[0].link}
                    // url="https://storage.googleapis.com/titanium-campus-313213/XPDJVI9JPQK7/st23_black-clover-tv-episode-150.1623743174.mp4"
                    controls={true}
                    className='react-player'
                    ref={ref}
                    playing={play}
                    onPlay={handlePlay}
                    onStart={ () => {
                        screenfull.request(ref.current.getInternalPlayer())
                    }}
                    onEnded={handleEnded}
                    onPause={handlePause}
                    width="100%"
                    height="100%"
                    playsinline={true}
                    style={{
                        outline: 'none',
                        border: 'none',
                    }}
                />
            </div>

        </div>
    )
}