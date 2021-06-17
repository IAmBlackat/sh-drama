import React, { useRef, useState } from 'react'
import { Box, IconButton, makeStyles, Typography } from '@material-ui/core'
import 'react-alice-carousel/lib/alice-carousel.css'
import Alice from 'react-alice-carousel'
import NavigationIcon from '@material-ui/icons/Navigation';
import { useList } from '../../hooks/useAxios';
import { useHistory } from 'react-router-dom'

const res = {
    500: {
        items: 3
    },
    740: {
        items: 4
    },
    1024: {
        items: 5
    },
    1400: {
        items: 7
    }
}

const styles = makeStyles( (theme) => ({
    root: {
        position: 'relative',
        marginTop: theme.spacing(2)
    },
    compWrapper: {
        display: 'flex',
        alignItems: 'center',
    },
    compTitle: {
        fontWeight: 'bold'
    },
    compNav: {

    },
    cardWrapper: {
        position: 'relative', 
        width: 150, 
        height: 220,
        borderRadius: 10,
        overflow: 'hidden',
        boxShadow: '2px 2px 10px 7px rgba(255,255,255,0.2)',
        WebkitBoxShadow: '2px 2px 10px 7px rgba(255,255,255,0.15)',
        marginRight: 20,
        marginTop: 10,
        margin: 10,
        cursor: 'pointer',
        transform: 'scale(1)',
        transition: 'all 0.3s',
        '&:hover': {
            transform: 'scale(1.05)',
            transition: 'all 0.3s'
        }
    },
    cardImg: {
        width: "100%",
        height: "100%",
    },
    cardTitle: {
        position: 'absolute',
        bottom: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0) 100%)',
        width: '100%'
    }
}))

export const Carousel = ({ card }) => {
    const classes = styles()
    const ref = useRef()
    const [activeIndex, setActiveIndex] = useState(0);

    const { result, loading, error } = useList('/popular/', 1)
    if(error) return <h1>Error</h1>
    const syncActiveIndex = ({ item }) => setActiveIndex(item)

    const history = useHistory()
    const handleClick = (d) => {
        history.push(`/info/${d.id}`)
    }

    const Card = ({ d, index }) => {
        return (
            <Box className={classes.cardWrapper} key={index}  onClick={ () => handleClick(d)} >
                <img className={classes.cardImg} src={d.img} alt="" />
                <Typography className={classes.cardTitle} variant="body2" align="center" >{d.title}</Typography>
            </Box>
        )
    }

    return loading ? "Loading" : (
        <div className={classes.root} >
            <div className={classes.compWrapper}>
                <Typography variant="h5" className={classes.compTitle} noWrap >
                    Popular K-Drama
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center' }} >
                    <IconButton onClick={() => ref.current.slidePrev()}>
                        <NavigationIcon style={{ transform: 'rotate(270deg)' }} />
                    </IconButton>

                    <Typography style={{ pointerEvents: 'none' }} >
                        page {activeIndex+1}                        
                    </Typography>   
                    
                    <IconButton onClick={() => ref.current.slideNext()}  >
                        <NavigationIcon style={{ transform: 'rotate(90deg)' }} />
                    </IconButton>
                </div>

            </div>

            <Alice 
                ref={ref}
                disableDotsControls
                infinite={true}
                disableButtonsControls
                items={result.map( (i, index) => (
                    <Card d={i} index={index} />
                ))}
                activeIndex={activeIndex}
                responsive={res}
                onSlideChanged={syncActiveIndex}
            />

        </div>
    )
}