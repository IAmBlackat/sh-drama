import { makeStyles, Typography } from '@material-ui/core'
import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { useId } from '../../hooks/useAxios'
import { color } from '../../utils/color'
import { FormattedTime } from 'react-player-controls'

const styles = makeStyles( (theme) => ({
    cardRotate: {
        width: 0,
        height: 250,
        overflow: 'hidden',
        marginRight: 20,
        marginTop: 10,
        margin: 10,
        transition: 'all ease-in 0.5s',
    },
    cardWrapper: {
        position: 'relative', 
        width: 160, 
        height: 230,
        borderRadius: 10,
        overflow: 'hidden',
        boxShadow: '2px 2px 10px 7px rgba(255,255,255,0.2)',
        WebkitBoxShadow: '2px 2px 10px 7px rgba(255,255,255,0.15)',
        marginRight: 20,
        marginTop: 10,
        margin: 10,
        cursor: 'pointer',
        transform: 'scale(1)',
        transition: 'all ease 0.3s',
        opacity: 0.75,
        '&:hover': {
            transform: 'scale(1.05)',
            transition: 'all ease 0.3s',
            color: color.lightBlue,
            opacity: 1
        }
    },
    cardImg: {
        width: "100%",
        height: "100%",
        opacity: 1,
        transition: 'all 0.3s',
    },
    cardImgfade: {
        width: "100%",
        height: "100%",
        opacity: 0,
        transition: 'all 0.3s',
    },
    cardContent: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        transition: 'all 0.3s',
    },
    cardTitle: {
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0) 100%)',
        width: '100%',
        position: 'absolute',
        bottom: 0
    },
    cardContentfade: {
        width: 0,
        transition: 'all 0.3s',
        position: 'absolute',
        bottom: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0) 100%)',
    },
    top: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(0.5),
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0) 100%)',

    },
    episode: {
        fontSize: 13,
    }
}))

const FetchInfo = ({ mainId, watchId, episodeTitle, currentEpisode, timeToContinue, lastEp }) => {
    const classes = styles()
    const history = useHistory()
    const { result, loading, error } = useId(mainId)
    // const [ hover, setHover ] = useState(false)
    const handleClick = () => {
        history.push(`/watching/${watchId}/episode/${currentEpisode}/${timeToContinue}`)
    }
    
    if(error) return <div>Error</div>
    // console.log(mainId, watchId, episodeTitle, currentEpisode, timeToContinue, lastEp)
    return(
        <Fragment>
             <div 
                className={loading ? classes.cardRotate : classes.cardWrapper } 
                onClick={handleClick} 
                // onMouseEnter={()=>setHover(true)}
                // onMouseLeave={()=>setHover(false)}
            >
                <img 
                    className={loading ? classes.cardImgfade : classes.cardImg} 
                    // src={'https://i.pinimg.com/originals/80/e9/60/80e960d5bc1e14e7f4815c3aae139ad0.gif'} 
                    // src={result.img}
                    src={`https://cdn.videokvid.com/cover/${mainId}.png`}
                    alt="" 
                />
                <div className={loading ? classes.cardContentFade : classes.cardContent } >

                    <div className={classes.top} >
                        <Typography className={classes.episode} >
                            Episode {currentEpisode}/{lastEp}
                        </Typography>
                        <Typography>
                            <FormattedTime className={classes.episode} numSeconds={Number(timeToContinue)} />
                        </Typography>
                    </div>

                    <Typography className={classes.cardTitle } variant="body2" align="center" >
                        {result.title}
                    </Typography>
                </div>
            </div>
        </Fragment>
    )
}

export default FetchInfo