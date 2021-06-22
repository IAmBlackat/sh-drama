import React from 'react'
import { Button as MuiButton } from '@material-ui/core'

const Button = () => {
    return (
        <MuiButton 
            key={key}
            onClick={handler}
            size={size}
            variant={variant}
            
        >
            {children}
        </MuiButton>
    )
}

export default Button