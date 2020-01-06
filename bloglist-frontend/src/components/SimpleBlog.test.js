/* eslint-disable */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'


test('renders title, author and likes', () => {
  const blog = {
    title: 'Testiblogi',
    author: 'Teppo Testaaja',
    url: 'testit.fi',
    likes: 7
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Testiblogi' && 'Teppo Testaaja' && '7 likes'
  )
})

test('clicking button calls event handler once', async () => {
  const blog = {
    title: 'Testiblogi',
    author: 'Teppo Testaaja',
    url: 'testit.fi',
    likes: 7
  }

  const mockHandler = jest.fn()

  const { getByText } = render (
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})