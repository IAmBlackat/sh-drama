import React, { useState } from 'react'
import { GridList, GridListTile, makeStyles, Typography } from '@material-ui/core'
import { useList } from '../../hooks/useAxios'
import { useHistory } from 'react-router-dom'

const styles = makeStyles( (theme) => ({
    root: {

    },
    title: {
        fontWeight: 'bold'
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
        // backgroundColor: 'rgba(0,0,0,0.5)',
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0) 100%)',
        // paddingBottom: theme.spacing(0.5),
        width: '100%'
    }
}))

export default function Popular() {
    const classes = styles()
    const [ page, setPage ] = useState(1)

    const { result, loading, error } = useList(`/popular/`, page)
    if(error) return <h1>Error</h1>

    // console.log(result)
    const history = useHistory()
    const handleClick = (d) => {
        history.push(`/info/${d.id}`)
    }

    const Card = ({ d }) => {
        return (
            <div className={classes.cardWrapper} onClick={ () => handleClick(d)} >
                <img className={classes.cardImg} src={d.img} alt="" />
                <Typography className={classes.cardTitle} variant="body2" align="center" >{d.title}</Typography>
            </div>
        )
    }

    return loading ? "Loading..." : (
        <div>
            <Typography onClick={()=>setPage(page+1)} variant="h5" className={classes.title} >
                Popular
            </Typography>

            <GridList cellHeight="auto" spacing={3} cols={7} >
                {result.map( (i,index) => (
                    <GridListTile key={index} >
                        <Card d={i} />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    ) 
}