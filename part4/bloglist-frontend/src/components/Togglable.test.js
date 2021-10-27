import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Togglable from './Togglable'
import Blog from './Blog'

describe('<Toggglable />', () => {
    let component
    const blog = jest.fn()

    beforeEach(() => {
        component = render(
            <Blog blog={blog} className="testDiv"/>
        )
    })

    // test('renders the blog', () => {
    //    expect(
    //        component.container.querySelector('.testDiv')
    //    ).toBeDefined()
    // })

    // test('at start blogs are not displayed', () => {
    //     const div = component.container.querySelector('.togglableContent')
    //     expect(div).toHaveStyle('display: none')
    // })
    
    test('after clicking view button, blog info is displayed', () => {
        const button = component.getByText('view')
        fireEvent.click(button)

        const div = component.container.querySelector('.blog')
        expect(div).not.toHaveStyle('display: none')
    })

    // test('like button is clicked twice', () => {
        
    //     const button = component.getByText('like')
    //     fireEvent.click(button)
    //     fireEvent.click(button)

    //     expect(blog.mock.calls).toHaveLength(2)
    // })
})