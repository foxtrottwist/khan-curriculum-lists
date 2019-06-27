import React from 'react'

import { BrowserBox, BrowserButton } from '../utils/styles'

export default function Courses({ courses, handleCourses }) {
  return (
    <BrowserBox>
      {courses.map(course => (
        <BrowserButton
          type="button"
          height="5.5em"
          key={course.internal_id}
          onClick={() => handleCourses(course)}
        >
          <span>{course.standalone_title}</span>
        </BrowserButton>
      ))}
    </BrowserBox>
  )
}
