import React, { useRef, useState, lazy, useEffect } from 'react'
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
    ClosedCaptionButton
} from 'video-react';
import './video-react.css'
import '../../../node_modules/video-react/dist/video-react.css'
import { useDispatch } from 'react-redux'
import { saveToHistory } from '../../redux/history/action'
import screenfull from 'screenfull'
import axios from 'axios'
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
    const [ sub, setSub ] = useState('')

    const dispatch = useDispatch()
    const history = useHistory()
    const path = useLocation().pathname
    const id = path.split('/')[2]
    const ep = path.split('/')[4]
    const seekTime = path.split('/')[5] 

    const { result, subtitle, loading, error, title, lastEp, episode, mainId } = useWatch(id, ep)

    useEffect( () => {
        let title = id.replace(/-20\d\d/gm,"")
        axios.get(`https://senhai-drama-server.vercel.app/download/${title}/${ep}`)
        .then( res => {
            setSub(res)
        } )
        .catch( err => console.log(err) )
    }, [])

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

    const track = <track kind="captions" srcLang="en-US" label="English" default src={sub} />

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
                            // src={ result.length !== 0 ? result[0] : null }
                            src="https://scontent.frix7-1.fna.fbcdn.net/v/t66.36240-6/10000000_1166862953826144_3648391539002045676_n.mp4?_nc_cat=110&ccb=1-3&_nc_sid=985c63&efg=eyJybHIiOjE1MDAsInJsYSI6NDA5NiwidmVuY29kZV90YWciOiJvZXBfaGQifQ%3D%3D&_nc_ohc=lC4I3scQBQAAX-scuke&rl=1500&vabr=194&_nc_ht=scontent.frix7-1.fna&oh=feb1f55583711f25d826d7b2e857ae19&oe=6109915C" 
                            onLoadStart={ () => {
                                ref.current.seek(seekTime)
                                console.log(ref.current)
                            }}
                            onLoadedData={() => {
                                ref.current.addTextTrack({
                                    src: sub,
                                    kind: 'captions',
                                    srclang: 'en',
                                    label: 'English',
                                    mode: 'showing'
                                })
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
                            children={track}
                        >
                            <track label="English" kind="captions" srcLang="en" src={sub} default />
                            <BigPlayButton position="center" />
                            <ControlBar >
                                <FullscreenToggle order={2} />
                                <ClosedCaptionButton order={3} />
                                <ReplayControl seconds={10} order={4.1} />
                                <ForwardControl seconds={10} order={4.2} />
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