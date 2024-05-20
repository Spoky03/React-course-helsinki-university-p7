import { createSlice, current } from "@reduxjs/toolkit"


const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        message: '',
        type: 'none'
    },
    reducers: {
        handleSetNotification(state, action) {
            return { message: action.payload, type: state.type }
        },
        clearNotification(state, action) {
            return { message: '', type: 'none' }
        },
        handleSetType(state, action) {
            return { type: action.payload, message: state.message }
        }
    }
})
export const { handleSetNotification, clearNotification, handleSetType } = notificationSlice.actions

export const setNotification = (message, type) => {
    return async dispatch => {
        dispatch(handleSetNotification(message))
        dispatch(handleSetType(type))
        setTimeout(() => {
            dispatch(clearNotification())
        }, 4000)
    }
}

export default notificationSlice.reducer