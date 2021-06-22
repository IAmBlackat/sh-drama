import { Button, Divider, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { color } from '../../utils/color'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const styles = makeStyles( (theme) => ({
    root: {
        marginLeft: theme.spacing(2),
    },
    title: {
        fontWeight: 'bold',
        marginTop: theme.spacing(4),
        marginLeft: theme.spacing(1),
        color: color.lightBlue
    },
    wrapper: {
        marginTop: theme.spacing(2)
    },
    btnContainer: {
        width: '100%',
        textAlign: 'left'
    },
    btn: {
        "&:hover": {
            color: color.lightBlue
        }
    },
    active: {
        color: color.lightBlue,
        "&:hover": {
            color: color.lightBlue
        }
    },
    divider: {
        backgroundColor: 'grey'
    }
}))

const Episode = ({ episode, title, history }) => {
    const classes = styles()

    return (
        <div className={classes.root} >
            <Typography className={classes.title} variant="h5" >
                More Episodes
            </Typography>

            <Divider className={classes.divider} />

            <div className={classes.wrapper} >
                {episode.map( (i,index) => (
                    <div className={classes.btnContainer} key={index} >
                        <Button 
                            className={ i.epName.trim() === title.trim() ? classes.active : classes.btn} 
                            variant="text" 
                            startIcon={ i.epName.trim() === title.trim() && <PlayArrowIcon />}
                            onClick={ () => {
                                history.push(`/watching/${i.id}/episode/${i.episode}`)
                            }}
                        >
                            {i.epName}
                        </Button>   
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Episode