import React from 'react'
import { Button, Card, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { color } from '../../utils/color'

const img = '//cdn.watchasian.co/cover/frightening-cohabitation.png'

const styles = makeStyles( (theme) => ({
    root: {
        // background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0) 100%)',
        background: `rgba(0,0,0,.7) url(${img})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundBlendMode: 'darken',
        borderRadius: 10,
        overflow: 'hidden'
    },
    card: {
        display: 'flex',
        // backgroundColor: '#303030',
        height: 300,
        width: '100%',
        background: 'transparent',
        backdropFilter: 'blur(15px)',
    },
    img: {
        width: "100%",
        height: '100%',
        minWidth: 150,
        maxWidth: 200,
    },
    watch: {
        backgroundColor: color.secondary,
        color: color.lightBlue,
        fontWeight: 'bold',
        "&:hover": {
            backgroundColor: color.secondary,
            color: color.lightBlue,
        },
        marginTop: theme.spacing(5)
    }
}))

export const Continue = () => {
    const classes = styles()

    return (
        <div className={classes.root} >
            <Card className={classes.card} >
                <CardMedia 
                    className={classes.img}
                    image="https://cdn.videokvid.com/cover/frightening-cohabitation.png" 
                    title=""
                />
                <CardContent style={{ width: '100%', height: '100%' }} >
                    
                    <Typography variant="h4" noWrap style={{ width: '90%' }} >
                        My Roommate is a Gumiho (2021)  
                    </Typography>
                    <Typography>
                        Status: Ongoing
                    </Typography>
                    <Typography variant="body1" >
                        Genres: Cohabitation, Comedy, Fantasy, Gumiho, Romance
                    </Typography>
                    <Typography>
                        Country: Korean
                    </Typography>
                    <Typography variant="inherit" style={{ width: '90%' }} >
                        Date Aired: 2021
                    </Typography>
                    <Typography>
                        Total Episodes: 6
                    </Typography>

                    <Button 
                        className={classes.watch} 
                        variant="contained" 
                        startIcon={<PlayArrowIcon />}
                    >
                        Continue Watching
                    </Button>
                </CardContent>
                
            </Card>
        </div>
    )
}