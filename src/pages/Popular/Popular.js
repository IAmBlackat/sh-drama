import React, { useState } from 'react'
import { GridList, GridListTile, makeStyles, Typography } from '@material-ui/core'
import { useList } from '../../hooks/useAxios'
import { useHistory } from 'react-router-dom'
import List from '../reusable/List'

const styles = makeStyles( (theme) => ({
    root: {

    },
    title: {
        fontWeight: 'bold'
    },
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

    return loading ? "Loading..." : (
        <div>
            <Typography onClick={()=>setPage(page+1)} variant="h5" className={classes.title} >
                Popular
            </Typography>
            <List result={result} handler={handleClick} />
        </div>
    ) 
}