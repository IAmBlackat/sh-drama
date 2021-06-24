import { GridList, GridListTile, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import Empty from './Empty'
import FetchInfo from './FetchInfo'

const styles = makeStyles( (theme) => ({
    root: {
        height: '100%',
        width: '100%'
    },
    title: {
        fontWeight: 'bold'
    }
}))

export default function History() {
    const classes = styles()
    const history = useSelector( state => state.history)
    console.log(history)

    const List = () => {
        return (
            <div>
                <Typography className={classes.title} variant="h5" >
                    Continue Watching
                </Typography>

                <GridList cellHeight="auto" spacing={3} cols={6}  >
                    { history.map( (i,index) => (
                        <GridListTile key={index} >
                            <FetchInfo 
                                mainId={i.mainId} 
                                watchId={i.watchId} 
                                episodeTitle={i.episodeTitle} 
                                currentEpisode={i.currentEpisode}
                                timeToContinue={i.timeToContinue}
                                lastEp={i.lastEp} 
                            />
                        </GridListTile>
                    )) }
                </GridList> 
            </div>
        )
    }

    return (    
        <div className={classes.root} >
            { history.length === 0 ? <Empty /> : <List /> }
        </div>
    )
}
