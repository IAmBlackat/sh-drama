import React from 'react'
import { Button, Card, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { color } from '../../utils/color'
import { useSelector } from 'react-redux';
import { useId } from '../../hooks/useAxios';
import { FormattedTime } from 'react-player-controls'
import Skeleton from '@material-ui/lab/Skeleton';
import { useHistory } from 'react-router-dom';

const styles = makeStyles( (theme) => ({
    root: {
        
    },
    bg: {
        // background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0) 100%)',
        borderRadius: 10,
        overflow: 'hidden'
    },
    card: {
        display: 'flex',
        // backgroundColor: '#303030',
        height: 300,
        width: '100%',
        background: 'transparent',
        backdropFilter: 'blur(15px)',
    },
    img: {
        width: "100%",
        height: '100%',
        minWidth: 150,
        maxWidth: 200,
    },
    watch: {
        backgroundColor: color.secondary,
        color: color.lightBlue,
        fontWeight: 'bold',
        "&:hover": {
            backgroundColor: color.secondary,
            color: color.lightBlue,
        },
        marginTop: theme.spacing(5)
    },
    subText: {
        
    }
}))

export const Continue = () => {
    const classes = styles()
    const history = useHistory()
    const recent = useSelector( state => state.history[0] )
    const { result, loading, error } = useId(recent.mainId)

    const Text = ({ title, subtitle }) => {
        return (
            <Typography className={classes.subText}>
                {title}: <span style={{ color: color.lightBlue }} >{subtitle}</span>
            </Typography>
        )
    }

    if(error) return <h1>Error</h1>

    const Loading = () => {
        return <Skeleton style={{ borderRadius: 10 }} width="100%" height="50%" variant="rect" animation="wave" />
    }

    return loading ? <Loading /> : (
        <div className={classes.root} >
            <div className={classes.bg} style={{
                    background: `rgba(0,0,0,.7) url(${result.img})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundBlendMode: 'darken',
            }} >
                <Card className={classes.card} >
                    <CardMedia 
                        className={classes.img}
                        image={result.img} 
                        title=""
                    />
                    <CardContent style={{ width: '100%', height: '100%' }} >
                        
                        <Typography 
                            variant="h4" 
                            noWrap 
                            style={{ width: '90%', fontWeight: 'bold', cursor: 'pointer' }} 
                            onClick={ () => history.push(`/info/${recent.mainId}`)}
                        >
                            {result.title}
                        </Typography>

                        <Text title="Status" subtitle={result.status} />
                        <Text title="Genre" subtitle={result.genre} />
                        <Text title="Country" subtitle={result.country} />
                        <Text title="Date Aired" subtitle={result.released} />
                        <Text title="Episode" subtitle={`${recent.currentEpisode}/${result.lastEp}`} />
                        <Button 
                            className={classes.watch} 
                            variant="contained" 
                            startIcon={<PlayArrowIcon />}
                            endIcon={<FormattedTime numSeconds={recent.timeToContinue} style={{ fontSize: '15px' }} />}
                            onClick={ () => {
                                history.push(`/watching/${recent.watchId}/episode/${recent.currentEpisode}/${recent.timeToContinue}`)
                            }}
                        >
                            Continue EP{recent.currentEpisode}
                        </Button>
                    </CardContent>
                    
                </Card>
            </div>
        </div>
    )
}