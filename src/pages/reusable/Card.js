import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import { color } from '../../utils/color'

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
        width: 180, 
        height: 250,
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
        '&:hover': {
            transform: 'scale(1.05)',
            transition: 'all ease 0.3s',
            color: color.lightBlue
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
    cardTitle: {
        position: 'absolute',
        bottom: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0) 100%)',
        width: '100%',
        transition: 'all 0.3s',
    },
    cardTitlefade: {
        width: 0,
        transition: 'all 0.3s',
    }
}))

const Card = ({ d, handler, loading }) => {
    const classes = styles()
    return (
        <div 
            className={loading ? classes.cardRotate : classes.cardWrapper } 
            onClick={ () => handler(d)} 
        >
            <img 
                className={loading ? classes.cardImgfade : classes.cardImg} 
                // src={ loading ? 'https://i.pinimg.com/originals/80/e9/60/80e960d5bc1e14e7f4815c3aae139ad0.gif' : d.img} 
                src={d.img}
                alt="" 
            />
            <Typography className={loading ? classes.cardTitlefade : classes.cardTitle } variant="body2" align="center" >{d.title}</Typography>
        </div>
    )
}

export default Card