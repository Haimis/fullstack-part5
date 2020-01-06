/* eslint-disable */

import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('Tests for App component', () => {
  test('do not show blogs when user not logged in', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )

    expect(component.container).toHaveTextContent(
      'log in to application' && 'username' && 'password'
    )

    expect(component.container).not.toHaveTextContent(
      'logged in' && 'blogs' && 'add new'
    )

  })
})