import { GridList, GridListTile, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const styles = makeStyles( (theme) => ({
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

const Card = ({ d, handler }) => {
    const classes = styles()

    return (
        <div className={classes.cardWrapper} onClick={ () => handler(d)} >
            <img className={classes.cardImg} src={d.img} alt="" />
            <Typography className={classes.cardTitle} variant="body2" align="center" >{d.title}</Typography>
        </div>
    )
}

const List = ({ result, handler }) => {
    const classes = styles()

    return (
        <GridList cellHeight="auto" spacing={3} cols={7} >
            {result.map( (i,index) => (
                <GridListTile key={index} >
                    <Card d={i} handler={handler} />
                </GridListTile>
            ))}
        </GridList>
    )
}

export default List