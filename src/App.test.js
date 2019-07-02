import React from 'react'
import { cleanup, render } from '@testing-library/react'
import 'jest-dom/extend-expect'
import App from './App'

import { SUBJECTS } from './utils/constants'

afterEach(cleanup)

describe('App', () => {
  it('renders with welcome message and subject buttons', () => {
    const { getAllByRole, getByText } = render(<App />)

    const buttons = getAllByRole('button').map(element => element.textContent)

    expect(buttons).toEqual(SUBJECTS.listing)
    expect(getByText('What Would You Like to Learn Today?'))
  })
})
