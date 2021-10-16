import React from 'react'

const Notification = ({ notification }) => {
    if (notification === null) {
        return null
    } else if(notification === 'blog-added') {
        return (
            <div className="blog-added">
                {'a new blog has been added'}
            </div>
        )
    }

    return (
        <div className="message">
            {'wrong username or password'}
        </div>
    )
}

export default Notification