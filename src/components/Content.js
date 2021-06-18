import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Switch, Route} from 'react-router-dom'
import Home from '../pages/Home/Home'
import Latest from '../pages/Latest/Latest'
import Popular from '../pages/Popular/Popular'
import Info from '../pages/Info/Info'
import Watch from '../pages/Watch/Watch'
import Search from '../pages/Search/Search'

const styles = makeStyles( (theme) => ({
    root: {
        textAlign: 'left',
        // backgroundColor: '#303030',
        marginLeft: theme.spacing(13),
        height: '85vh',
        marginRight: theme.spacing(1),
        borderRadius: 10,
        // padding: theme.spacing(1)
    }
}))

export default function Content() {
    const classes = styles()
    return (
        <div className={classes.root} >
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/latest" component={Latest} />
                <Route path="/popular" component={Popular} />
                <Route path="/info/:id" component={Info} />
                <Route path="/watching/:id/episode/:number" component={Watch} />
                <Route path="/search/:query" component={Search} />
            </Switch>
        </div>
    )
}