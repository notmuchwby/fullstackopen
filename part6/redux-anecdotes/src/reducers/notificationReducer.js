const initialState = "dratute"

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NOTIFICATION':
            state = action.notification
            return state
        default:
            return state
    }
}

export const displayNotification = () => {
    return {
        type: 'NOTIFICATION',
        notification: 'initial statement'
    }
}

export default notificationReducer