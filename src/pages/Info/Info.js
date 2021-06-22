import React from 'react'
import { Divider, makeStyles, Typography } from '@material-ui/core'
// import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { color } from '../../utils/color';
import { Tabs } from './Tabs'
import { useId } from '../../hooks/useAxios';
import { useLocation } from 'react-router-dom';

const img ="//cdn.watchasian.co/cover/frightening-cohabitation.png" 

const styles = makeStyles( (theme) => ({
    root: {

    },
    // bg: {
    //     background: `rgba(0,0,0,.7) url(${img})`,
    //     backgroundRepeat: 'no-repeat',
    //     backgroundPosition: 'center',
    //     backgroundSize: 'cover',
    //     backgroundBlendMode: 'darken',
    //     height: '85vh',
    //     width: '100%',
    //     position: 'absolute',
    //     filter: 'blur(10px)'
    // },
    foreground: {
        background: 'transparent', 
        position: 'absolute',
        padding: theme.spacing(7),
        display: 'flex',
        width: '100%'
    },
    detailsWrapper: {
        backdropFilter: 'blur(20px)', 
        background: 'rgba(255,255,255,0.1)',
        width: 230,
        height: '100%',
        borderRadius: 10
    },
    subText: {
        fontSize: '15px',
        marginTop: theme.spacing(0.5),
    },
    content: {
        paddingLeft: theme.spacing(2),
        width: '100%'
    },
    watch: {
        backgroundColor: color.secondary,
        color: color.lightBlue,
        fontWeight: 'bold',
        "&:hover": {
            backgroundColor: color.secondary,
            color: color.lightBlue,
        },
        marginBottom: theme.spacing(2)
    }
}))

export default function Info() {
    const classes = styles()

    const path = useLocation().pathname
    const id = path.split('/')[2]

    const { result, loading, error } = useId(id)    
    // console.log(result)
    const Text = ({ title, subtitle }) => {
        return (
            <Typography className={classes.subText}>
                {title} <span style={{ color: color.lightBlue }} >{subtitle}</span>
            </Typography>
        )
    }
    
    if(error) {
        return <h1>Error</h1>
    } else {
        return loading ? "Loading..." : (
            <div style={{ position: 'relative' }} >
                <div style={{
                        background: `rgba(0,0,0,.7) url(${result.img})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundBlendMode: 'darken',
                        height: '85vh',
                        width: '100%',
                        position: 'absolute',
                        filter: 'blur(20px)'
                    }}
                />
                <div className={classes.foreground} >
                    <div className={classes.detailsWrapper} >
                        <img src={result.img} alt="" width='100%' height={250} style={{  borderTopLeftRadius: 8, borderTopRightRadius: 8 }} />
                        <div style={{ padding: '10px', paddingTop: '3px', }} >
                            <Typography style={{ fontSize: '16px', paddingBottom: 2 }} variant="body2" >
                                {result.title}
                            </Typography>
    
                            <div style={{ marginTop: '5px', marginBottom: '5px' }} >
                                <Divider  />
                                    <Typography align="center" >Information</Typography>
                                <Divider />
                            </div>
    
                            <Text title="Country: " subtitle={result.country} />
                            <Text title="Aired: " subtitle={result.released} />
                            <Text title="Status: " subtitle={result.status} />
                            <Text title="Genre: " subtitle={result.genre} />
                        </div>
                    </div>
    
                    <div className={classes.content} >
                        {/* <Button 
                            className={classes.watch} 
                            variant="contained" 
                            startIcon={<PlayArrowIcon />}
                        >
                            Watch Now
                        </Button> */}
                        <div style={{ marginBottom: 5 }} >
                            <Typography variant="h5" style={{ fontWeight: 'bold' }} >
                                {result.title}
                            </Typography>

                            <Typography variant="inherit"  >
                                {result.othername}
                            </Typography>
                        </div>
                        
                        <Typography style={{ marginBottom: 3 }} >
                            Genres: <span style={{color: color.lightBlue}} >
                                {result.genre}
                            </span>
                        </Typography>
    
                        <Tabs ep={result.ep} trailer={result.trailer} loading={loading} dramaId={id} />
                    </div>
                </div>
            </div>
        )
    }

}