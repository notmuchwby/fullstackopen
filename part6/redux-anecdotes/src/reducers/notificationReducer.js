const initialState = ""

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'VOTE_ADDED_NOTIFICATION':
            state = action.notification
            return `you voted '${state}'`
        case 'NEW_ANECDOTE_ADDED':
            state = action.notification
            return `you added a new anecdote '${state}'`
        case 'REMOVE_NOTIFICATION':       
            return state = ''
        default:
            return state
    }
}

export const displayVoteNotification = (notification) => {
    return {
        type: 'VOTE_ADDED_NOTIFICATION',
        notification
    }
}

export const displayAddedNotification = (notification) => {
    return {
        type: 'NEW_ANECDOTE_ADDED',
        notification
    }
}

export const removeNotification = () => {
    return {
        type: 'REMOVE_NOTIFICATION',
    }
}

export default notificationReducer