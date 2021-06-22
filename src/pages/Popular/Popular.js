import React, { useState } from 'react'
import { IconButton, makeStyles, Typography } from '@material-ui/core'
import NavigationIcon from '@material-ui/icons/Navigation';
import { useList } from '../../hooks/useAxios'
import { useHistory } from 'react-router-dom'
import List from '../reusable/List'
import { color } from '../../utils/color';

const styles = makeStyles( (theme) => ({
    root: {

    },
    title: {
        fontWeight: 'bold',
        marginRight: theme.spacing(2)
    },
    nav: {
        display: 'flex',
        alignItems: 'center'
    },
    icon: {

    }
}))

export default function Popular() {
    const classes = styles()
    const [ page, setPage ] = useState(1)
    const [ part, setPart ] = useState(1)
 
    const { result, loading, error } = useList(`/popular/`, page, part)


    // const [ isLoading, setIsLoading ] = useState(loading)

    const history = useHistory()
    const goToInfo = (d) => {
        // setIsLoading(true)
        history.push(`/info/${d.id}`)
        // setIsLoading(false)
    }
    const nextPage = () => {
        // setPage(page+1)
        setPart(part+1)
        if(part+1 === 4) {
            setPage(page+1)
            setPart(1)
        }
    }
    const prevPage = () => {
        setPart(part-1)
        if(part-1 === 0) {
            setPage(page-1)
            setPart(3)
        }
    }

    if(error) return <h1>Error</h1>

    return (
        <div className={classes.root} >
            <div className={classes.nav} >
                <Typography onClick={nextPage} variant="h5" className={classes.title} >
                    Popular
                </Typography>
                
                <IconButton onClick={prevPage} style={{ color: page === 1 && part === 1 ? '' : color.lightBlue, }} disabled={page === 1 && part === 1} size="small" >
                    <NavigationIcon style={{ transform: 'rotate(270deg)' }} />
                </IconButton>

                <Typography style={{ pointerEvents: 'none', color: color.lightBlue, marginRight: 5, marginLeft: 5 }} >
                    page {page}/{part}                   
                </Typography>   
                
                <IconButton onClick={nextPage} size="small"  >
                    <NavigationIcon style={{ transform: 'rotate(90deg)', color: color.lightBlue }} />
                </IconButton>
            </div>

            <List result={result.slice(0,12)} handler={goToInfo} loading={loading} />
            
        </div>
    ) 
}