const initialState = ""

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NOTIFICATION':
            return state = action.data
        default:
            return state
    }
}

export const displayNotification = () => {
    return {
        type: 'NOTIFICATION',
        data: 'initial statement'
    }
}

export default notificationReducer