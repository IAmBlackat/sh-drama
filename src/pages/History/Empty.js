import React from 'react'
import { Typography } from '@material-ui/core'

const Empty = () => {
    return (
        <div 
            style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
            }}
        >
            <Typography variant="h4" >
                Nothing here yet
            </Typography>
        </div>
    )
}

export default Empty