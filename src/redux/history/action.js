export const SAVE_TO_HISTORY = 'SAVE_TO_HISTORY'

export const saveToHistory = (data) => {
    return {
        type: 'SAVE_TO_HISTORY',
        data: data
    }
}