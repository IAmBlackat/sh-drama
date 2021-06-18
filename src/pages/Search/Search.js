import React, { useState } from 'react'
import { Typography } from '@material-ui/core'
import { useHistory, useLocation } from 'react-router-dom'
import { useList } from '../../hooks/useAxios'
import List from '../reusable/List'

export default function Search() {

    const query = useLocation().pathname.split('/')[2]
    // console.log(query)

    const { result, loading, error } = useList('/search/', query)

    console.log(result)

    const history = useHistory()
    const handleClick = (d) => {
        history.push(`/info/${d.id}`)
    }

    return loading ? "Loading..." : (
        <div>
            <Typography>Search</Typography>

            <List result={result} handler={handleClick} />
        </div>
    )
}