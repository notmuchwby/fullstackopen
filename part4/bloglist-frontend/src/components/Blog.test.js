import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
    const blog = {
        title: 'Test title',
        author: 'Test author'
    }

    const component = render(
        <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
        'Test title', 'Test author'
    )
})

test('like button is clicked twice', () => {    
    const blog = {
        title: 'Test title',
        author: 'Test author'
    }
    const component = render(
        <Blog blog={blog} />
    )
    
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    const addLike = component.container.querySelector('.likeButton')
    expect(addLike.mock.calls).toHaveLength(2)
})

