import React, { useState } from 'react'
import { Box, Button, makeStyles, Tab, Tabs as  T, Typography } from '@material-ui/core'
import { color } from '../../utils/color'
import Player from 'react-player'
import { useHistory } from 'react-router-dom'

const styles = makeStyles( (theme) => ({
    root: {
        flexGrow: 1,
        backdropFilter: 'blur(10px)',
        background: 'rgba(255,255,255,0.1)',
        marginTop: theme.spacing(2),
        borderRadius: 10,
        width: '100%'
    },
    video: {
        width: '70%',
        height: 350,
        padding: 10,
        margin: 'auto'
    },
    ep: {
        display: 'flex',
        flexGrow: 1,
        flexWrap: 'wrap',
        // display: 'grid',
        // gridTemplateColumns: 'auto auto auto auto auto',
        // gridGap: theme.spacing(1),
        justifyContent: 'space-evenly',
        width: '100%'
        
    },
    btn: {
        margin: theme.spacing(1),
        color: color.lightBlue,
        width: '100%'
    }
}))
export const Tabs = ({ ep, trailer, loading }) => {
    const classes = styles()
    const [ value, setValue ] = useState(0)

    const handleChange = (e, newValue) => {
        setValue(newValue)
    }

    const TabPanel = (props) => {
        const { children, value, index, ...other } = props;
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`scrollable-prevent-tabpanel-${index}`}
                aria-labelledby={`scrollable-prevent-tab-${index}`}
                {...other}
            >
                {value === index && (
                <Box p={2}>
                    {children}
                </Box>
                )}
          </div>
        )
    }
    
    const history = useHistory()
    const handleClick = (d) => {
        history.push(`/watching/${d.id}/episode/${d.episode}`)
    }

    return loading ? "Loading..." : (
        <div className={classes.root} >
            <T 
                value={value} 
                onChange={handleChange} 
                indicatorColor="primary"
                // variant="fullWidth"
                style={{ }}
            >
                <Tab label="Episode" />
                <Tab label="Trailer" />
            </T>

            <TabPanel value={value} index={0}>
                <div className={classes.ep} >
                { ep !== undefined && ep.map( (i,index) => (
                    <div key={index}  >
                        { i.sub === 'SUB' ? 
                            <Button variant="outlined" className={classes.btn} onClick={() => handleClick(i) } >Episode {i.episode} Sub</Button>
                            : 
                            <Button variant="outlined" className={classes.btn} onClick={() => handleClick(i) } style={{ color: color.primary }} >Episode {i.episode} Raw </Button>
                        }
                    </div>
                )) }
                </div>
            </TabPanel>

            <TabPanel value={value} index={1}>
                <div className={classes.video} >
                    <Player 
                        url={trailer}
                        width="100%"
                        height="100%"
                        controls={true}
                    />
                </div>
            </TabPanel>
        </div>
    )
}