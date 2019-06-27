import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

it('renders with welcome message', () => {
  const { getByText } = render(<App />)
  expect(getByText('What Would You Like to Learn Today?'))
})
