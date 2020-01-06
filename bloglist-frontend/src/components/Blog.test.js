/* eslint-disable */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


test('renders title and author only', () => {
  const blog = {
    title: 'Testiblogi',
    author: 'Teppo Testaaja',
    url: 'testit.fi',
    likes: 7
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Testiblogi' && 'Teppo Testaaja'
  )
  expect(component.container).not.toHaveTextContent(
    'likes' && 'url'
  )

})

test('renders title, author, url and likes after clicked', async () => {
    const user = {
        name: "käyttjä",
        id: '123'
    }

    const blog = {
    id: '1',
    title: 'Testiblogi',
    author: 'Teppo Testaaja',
    url: 'testit.fi',
    likes: 7,
    user: user
  }


  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} onClick={mockHandler} user={user}/>
  )

  

  const blogElement = component.container.querySelector(".shortForm");
  fireEvent.click(blogElement);
  
  expect(component.container).toHaveTextContent(
    'testit.fi' && 'added by käyttäjä' && '7 likes'
  )


})