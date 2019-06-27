import React from 'react'
import styled from 'styled-components'

const HeaderBox = styled.header`
  display: flex;
  flex-direction: column;

  div:first-of-type {
    background-color: #fcfcfc;
    height: 1.75rem;
    border-bottom: 0.3rem solid #d1fad7;
    padding: 0.4rem 0 0 0.5rem;
    h4 {
      font-weight: 400;
      margin: 0.2rem;
      color: #4caf50;
    }
  }

  div:nth-of-type(2) {
    background-color: #4caf50;
    height: 8rem;
    padding: 0.3%;
    color: #d1fad7;
    margin-bottom: 0.5%;
    box-shadow: 0px 1px 6px #ccc;
    h1 {
      font-weight: 400;
      text-align: center;
      margin-top: 2.5rem;
    }
  }
`
export default function Header() {
  return (
    <HeaderBox>
      <div>
        <h4>Khan Curriculum Browser</h4>
      </div>
      <div>
        <h1>What Would You Like to Learn Today?</h1>
      </div>
    </HeaderBox>
  )
}
