import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const useContinue = (id, ep) => {
    const [] = useState(false)

    const hasContinue = useSelector( state => state.history )

}

export default useContinue