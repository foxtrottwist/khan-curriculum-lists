import React from 'react'

import { BrowserBox, BrowserButton } from '../utils/styles'
import { SUBJECTS } from '../utils/constants'

export default function Subjects({ handleSubjects }) {
  return (
    <BrowserBox>
      {SUBJECTS.listing.map((subject, index) => (
        <BrowserButton
          type="button"
          key={subject}
          name={subject}
          onClick={() => {
            handleSubjects(index)
          }}
        >
          <span>{subject}</span>
        </BrowserButton>
      ))}
    </BrowserBox>
  )
}
