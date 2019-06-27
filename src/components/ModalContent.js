import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

import { BrowserButton } from '../utils/styles'

const ContentBox = styled.div`
  display: flex;
  align-items: center;
  height: 15rem;
  width: 40rem;
  padding: 1rem;
  overflow: auto;
  h4,
  p {
    margin: 0 1rem 0.5rem 1rem;
  }
`
const ButtonBox = styled.div`
  display: flex;
  justify-content: space-around;
  width: 20rem;
  margin: auto 10rem;
`

export default function ModalContent({ selectedCourse, cancel, addCourse }) {
  const contentRef = useRef()
  useEffect(() => contentRef.current.focus())

  const { icon, title, description } = selectedCourse
  return (
    <>
      <ContentBox ref={contentRef}>
        <div>
          <img alt="course icon" src={icon} />
        </div>
        <div>
          <h4>{title}</h4>
          <p>{description}</p>
        </div>
      </ContentBox>
      <ButtonBox>
        <BrowserButton
          type="button"
          onClick={() => {
            addCourse(selectedCourse)
          }}
        >
          Add
        </BrowserButton>
        <BrowserButton type="button" onClick={() => cancel()}>
          Cancel
        </BrowserButton>
      </ButtonBox>
    </>
  )
}
