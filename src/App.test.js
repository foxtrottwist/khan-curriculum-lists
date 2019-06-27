import React from 'react'
import { cleanup, render } from '@testing-library/react'
import App from './App'

afterEach(cleanup)

describe('App', () => {
  it('renders with welcome message', () => {
    const { debug, getByText } = render(<App />)
    expect(getByText('What Would You Like to Learn Today?'))
    debug()
  })
})
