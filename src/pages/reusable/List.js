import React from 'react'
import { GridList, GridListTile } from '@material-ui/core'
import Card from './Card'

const List = ({ result, handler, loading, useCustomCard, component }) => {
    return (
        <GridList cellHeight="auto" spacing={3} cols={6} >
            {result.map( (i,index) => (
                <GridListTile key={index} >
                    {useCustomCard ? {component} : <Card d={i} handler={handler} loading={loading} />}
                </GridListTile>
            ))}
        </GridList>
    )
}

const areEqual = (prevProps, nextProps) => {
    return prevProps === nextProps ? true : false
}

export default React.memo(List,areEqual)