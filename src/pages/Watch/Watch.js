import React, { useRef, useState, lazy } from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import { color } from '../../utils/color'
import { useHistory, useLocation } from 'react-router-dom'
import { useWatch } from '../../hooks/useAxios'
import { 
    Player,
    ControlBar,
    ReplayControl,
    ForwardControl,
    CurrentTimeDisplay,
    TimeDivider,
    VolumeMenuButton,
    BigPlayButton,
    FullscreenToggle,
    DurationDisplay,
    
} from 'video-react';
import './video-react.css'
import '../../../node_modules/video-react/dist/video-react.css'
import { useDispatch } from 'react-redux'
import { saveToHistory } from '../../redux/history/action'
import screenfull from 'screenfull'
const Episode = lazy( () => import('./Episode'))

const styles = makeStyles( (theme) => ({
    root: {
        height: '100%',
        padding: theme.spacing(2),
        width: '100%',
        outline: 'none',
        border: 'none',
    },
    container: {
        display: 'flex',
        width: '100%'
    },
    wrapper: {
        width: '60%'
    },
    episodeList: {
        width: '40%'
    },
    watching: {
        fontWeight: 'bold',
        pointerEvents: 'none'
    },
    title: {
        color: color.lightBlue,
        fontWeight: 'bold',
        pointerEvents: 'none'
    },
    videoWrapper: {
        width: '100%', 
        borderRadius: 8,
        marginTop: theme.spacing(2),
        backgroundColor: '#303030',
        borderRadius: 10,
        outline: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        overflow: 'hidden',
        fontStyle: 'Lexen Deca'
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
    controlWrapper: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '10%',
        background: 'linear-gradient(0deg, rgba(2,0,36,0) 0%, rgba(0,0,0,0.7190826672465861) 100%)',
    },
    playcontrol: {
        padding: 0,
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 10,
        paddingLeft: 10,
        minWidth: 30
    },
}))

export default function Watch() {
    const classes = styles()
    const ref = useRef(null)

    const dispatch = useDispatch()
    const history = useHistory()
    const path = useLocation().pathname
    const id = path.split('/')[2]
    const ep = path.split('/')[4]
    const seekTime = path.split('/')[5] 

    const { result, loading, error, title, lastEp, episode, mainId } = useWatch(id, ep)

    const [ play, setPlay ] = useState(false)

    const handlePlay = () => {
        setPlay(true)
        const el = document.querySelector("#video")
        screenfull.request(el)
        // ref.current.getState().player.isFullscreen && ref.current.toggleFullscreen()
        // ref.current.actions.handlePause()
    }
    const handlePause = () => {
        setPlay(false)
        dispatch(saveToHistory({
            timeToContinue: ref.current.getState().player.currentTime,
            watchId: id,
            episodeTitle: title,
            currentEpisode: ep,
            lastEp: lastEp,
            mainId: mainId
        }))
    }
    const handleEnded = () => {
        // ref.current.getState().player.isFullscreen && ref.current.toggleFullscreen()
        const el = document.querySelector("#video")
        screenfull.exit(el)
        Number(ep) >= Number(lastEp) ? setPlay(false) : history.push(`/watching/${id}/episode/${Number(ep)+1}/0`)
    }

    if(error) return <h1>Error</h1>
    return (
        <div className={classes.root} >
            <div className={classes.container} >
                { loading ? <Typography className={classes.watching} style={{ width: '60%' }} variant="h5" >Now Loading...</Typography> :  <div className={classes.wrapper} >
                    <div>
                        <Typography className={classes.watching} variant="h5" >Now Watching...</Typography>
                  
                    </div>
                        {/* {console.log(ref.current)} */}
                    <div id="video" className={classes.videoWrapper} onClick={ () => console.log("click")} >
                        <Player 
                            ref={(player) => ref.current = player } 
                            src={ result.length !== 0 ? result[0] : null }
                            // src="https://storage.googleapis.com/eco-silicon-315313/AYPM5W9J5C4H/22a_1623990806163515.mp4" 
                            onLoadStart={ () => {
                                ref.current.seek(seekTime)
                                console.log(ref.current)
                            }}
                            onLoadedData={() => {
                                ref.current.actions.play()
                                ref.current.video.toggleFullscreen()
                                const el = document.querySelector("#video")
                                screenfull.request(el)
                            }}
                            // onReady={ () =>ref.current.actions.play()}
                            // onCanPlay={ () => ref.current.video.toggleFullscreen()}
                            // onCanPlay={(e) => console.log(':Asdfasfdf')}
                            playsInline 
                            // autoPlay={true}
                            // onPlaying={()=>ref.current.video.toggleFullscreen()}
                            // fullscreen={()=>console.log("adfsdf")}
                            onPlay={handlePlay}
                            onPause={handlePause}
                            onEnded={handleEnded}
                            startTime={Number(seekTime)}
                            aspectRatio="auto"

                        >
                            <BigPlayButton position="center" />
                            <ControlBar >
                                <FullscreenToggle order={2} />
                                <ReplayControl seconds={10} order={3.1} />
                                <ForwardControl seconds={10} order={3.2} />
                                <VolumeMenuButton disabled />  
                                <CurrentTimeDisplay order={8} />
                                <TimeDivider order={8.5} style={{ fontStyle: 'Lexend Deca' }} />
                                <DurationDisplay order={9} />
                            </ControlBar>
                        </Player>
            
                    </div>  

                    <Typography className={classes.title} variant="h5" >
                        {title} 
                    </Typography>
                </div>}

                <div className={classes.episodeList} >
                    <Episode episode={episode} title={title} history={history} />
                </div>
            </div>
        </div>
    )
}