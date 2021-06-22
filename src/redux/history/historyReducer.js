import { SAVE_TO_HISTORY } from './action'

// const initState = {
//     timeToContinue: 0,
//     id: '',
//     title: '',
//     currentEpisode: '',
// }

const historyReducer = (state = [], action) => {
    let newState = [...state]
    switch(action.type) {
        case SAVE_TO_HISTORY:
            // check if there's a same id
            newState = newState.filter( i => i.watchId !== action.data.watchId)
            // newState.push({ ...action.data })

            newState.length === 12 && newState.pop()
            newState.unshift({ ...action.data })
            console.log(newState)
            return newState
            
        default: return state
    }
}

export default historyReducer