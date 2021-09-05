const Notification = ({message}) => {
    const notificationStye = {
        color: 'green',
        backGround: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if(message === "This person has already been deleted") {
        notificationStye.color = 'red'
    }

    if(message === null) {
        return null
    }

    return (
        <div style={notificationStye}>
            {message}
        </div>
    )
}

export default Notification 