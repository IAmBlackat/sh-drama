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
        width: 150, 
        height: 200,
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
    cardTitleWrapper: {
        position: 'absolute',
        bottom: 0,
        // backgroundColor: 'rgba(0,0,0,0.5)',
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0) 100%)',
        paddingBottom: theme.spacing(0.5),
        width: '100%',
        padding: theme.spacing(1)
    },
    cardSub: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}))

export default function Latest() {
    const classes = styles()
    const [ page, setPage ] = useState(1)
    const { result, loading, error } = useList('/recent/', page)
    console.log(result.length)
    if(error) return <h1>Error</h1>

    const history = useHistory()
    const handleClick = (d) => {
        history.push(`/watching/${d.id}/episode/${d.ep}`)
    }
    console.log(3%1)
    const Card = ({ d }) => {
        return (
            <div className={classes.cardWrapper} onClick={ () => handleClick(d)} >
                <img className={classes.cardImg} src={d.img} alt="" />

                <div className={classes.cardTitleWrapper} >
                    <Typography variant="body2" >{d.title}</Typography>
                    <div className={classes.cardSub} >
                        <Typography variant="body2" >EP {d.ep}</Typography>
                        <Typography variant="body2" >{d.time}</Typography>
                    </div>
                </div>
                
            </div>
        )
    }

    return loading ? "Loading..." : (
        <div>
            <Typography variant="h5" onClick={()=>setPage(page+1)} className={classes.title} >
                Latest Updates
            </Typography>

            <GridList cellHeight="auto" spacing={3} cols={6} >
                {result.map( (i,index) => (
                    <GridListTile key={index}  >
                        <Card d={i} />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    ) 
}