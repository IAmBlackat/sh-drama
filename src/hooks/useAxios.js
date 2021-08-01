import { useEffect, useState } from 'react'
import axios from 'axios'

// v1 => stable
// v2 => unstable 
// v3 => main source

const baseUrl = 'https://senhai-drama-server.vercel.app/api/v3/drama'
// const baseUrl = `http://localhost:5000/api/v3/drama`

export const useList = (endpoint, page, part) => {
    const [ result, setResult ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(false)
    const v = 'v3'
    // const baseUrl = `http://localhost:5000/api/${v}/drama`
    // const baseUrl = 'https://senhai-drama-server.vercel.app/api/v3/drama'
    const url = `${baseUrl}${endpoint}${page}/part/${part}`
    // console.log(url)

    const catcher = async () => {
        await axios.get(url)
        .then( res => {
            // console.log(res.status === 404)
            console.log("fetch again")
            if(res.data.success === true) {
                setResult(res.data.results)
                setLoading(false)
            } else {
                setError(true)
            }
        })
        .catch( err => {
            setError(true)
            setLoading(false)
            console.error(err)
        } )
    }

    const fetch = async () => {
        await axios.get(url)
        .then( res => {
            // console.log(res.data.results.length)
            if(!res.data.success) catcher()
            // if(res.data.results[0].img === "https://watchasian.vc/images/background.jpg") catcher()
            if(res.data.results.length !== 0) {
                setResult(res.data.results)
                setLoading(false)
            }
            // setError(true)
            
        })
        .catch( err => {
            catcher()
            // if(!err.data.success) catcher()
            // setError(true)
            // setLoading(false)
            console.error(err)
        } )
    }

    useEffect( () => {
        setLoading(true)
        setError(false)
        let c = axios.CancelToken.source()

        fetch()
        
        return () => c.cancel("AXios fetch cancel")

    }, [url, endpoint, page, v])

    return { result, loading, error }
}

export const useId = (id) => {
    const [ result, setResult ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState(false)

    // const v = 'v3'
    // const baseUrl = `http://localhost:5000/api/${v}/drama/info/`
    const url = `${baseUrl}/info/${id}`

    const fetchInfo = async () => {
        await axios.get(url)
        .then( res => {
            // console.log(res.status === 404)
            if(!res.data.success) catcher()
            if(res.data.success) {
                setResult(res.data.results)
                setLoading(false)
            }
        })
        .catch( err => {
            catcher()
            // setError(true)
            console.error(err)
        } )
    }

    useEffect( () => {
        setLoading(true)
        setError(false)
        let c = axios.CancelToken.source()

        fetchInfo()
        
        return () => c.cancel("AXios fetch cancel")
    }, [url, id])
    
    const catcher = async () => {
        await axios.get(url)
        .then( res => {
            // console.log(res.status === 404)
            console.log("fetch again")
            if(res.data.success) {
                setResult(res.data.results)
                setLoading(false)
            } else {
                setError(true)
                setLoading(false)
            }
            if(!res.data.success) setError(true)
        })
        .catch( err => {
            setError(true)
            setLoading(false)
            console.error(err)
        } )
    }

    return { result, loading, error }

}

export const useWatch = (id, ep) => {
    const [ result, setResult ] = useState([])
    const [ subtitle, setSubtitle ] = useState('')
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState(false)
    const [ title, setTitle ] = useState('')
    const [ lastEp, setlastEp ] = useState(null)
    const [ episode, setEpisode ] = useState([])
    const [ mainId, setMainId ] = useState('')

    // const v = 'v3'
    // const url = `http://localhost:5000/api/${v}/drama/watching/${id}/episode/${ep}`
    const url = `${baseUrl}/watching/${id}/episode/${ep}`
    
    const fetchInfo = async () => {
        await axios.get(url)
        .then( res => {
            // console.log(res.data)
            if(!res.data.success) catcher()
            if(res.data.success) {
                setResult(res.data.results)
                setTitle(res.data.title)
                setlastEp(res.data.lastEp)
                setEpisode(res.data.ep)
                setSubtitle(res.data.subtitle)
                // console.log("maind id", res.data.mainId)
                setMainId(res.data.mainId)
                setLoading(false)
            }
        })
        .catch( err => {
            catcher()
            // setError(true)
            console.error(err)
        } )
    }

    useEffect( () => {
        setLoading(true)
        setError(false)
        let c = axios.CancelToken.source()

        fetchInfo()
        
        return () => c.cancel("AXios fetch cancel")
    }, [url, id, ep])

    const catcher = () => {
        axios.get(url)
        .then( res => {
            // console.log(res.status === 404)
            console.log("fetch again")
            // console.log(res.data)
            if(res.data.success) {
                setResult(res.data.results)
                setSubtitle(res.data.subtitle)
                setTitle(res.data.title)
                setlastEp(res.data.lastEp)
                setEpisode(res.data.ep)
                setMainId(res.data.mainId)
                setLoading(false)
            } else {
                setError(true)
            }
        })
        .catch( err => {
            console.error(err)
            setError(true)
            setLoading(false)
        } )
    }
    
    return { result, subtitle, loading, error, title, lastEp, episode, mainId }
}