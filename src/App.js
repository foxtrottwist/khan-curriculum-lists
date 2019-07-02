import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import styled, { createGlobalStyle } from 'styled-components'

import Courses from './components/Courses'
import CurriculumList from './components/CurriculumList'
import Header from './components/Header'
import ModalContent from './components/ModalContent'
import Subjects from './components/Subjects'
import Topics from './components/Topics'

import { loadState, saveState } from './services/storage'
import { get } from './services/api'
import { SUBJECTS } from './utils/constants'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #fcfcfc;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%234caf50' fill-opacity='0.17'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
`

const Main = styled.main`
  margin: 0 3rem;
  max-width: 1200px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
`
const CurriculumBrowser = styled.section`
  width: 66.66%;
  margin-top: 1.5em;
`
const ModalBox = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  background: #fff;
  border: 0.2em solid #4caf50;
  border-radius: 1%;
  box-shadow: 1.5px 1.5px 6px #ccc;
`

export default function App() {
  const [curriculumList, setCurriculumList] = useState(() => loadState())
  const [topics, setTopics] = useState(null)
  const [courses, setCourses] = useState(null)
  const [selectedCourse, setSelectCourse] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  const handleSubjects = index =>
    get(SUBJECTS.resources[index])
      .then(response => setTopics(response.children), setCourses(null))
      .catch(error => console.log(error))

  const handleTopics = topic =>
    get(topic)
      .then(response => setCourses(response.children))
      .catch(error => console.log(error))

  const handleCourses = course => {
    setSelectCourse(course)
    setIsVisible(true)
  }

  const addCourse = course => {
    setCurriculumList(
      !curriculumList ? [course] : [...new Set([...curriculumList, course])],
    )
    setIsVisible(false)
  }

  const modalRef = useRef()

  const handleOutSideClick = ({ target }) => {
    if (isVisible && !modalRef.current.contains(target)) {
      setIsVisible(false)
    }
  }

  useEffect(() => saveState(curriculumList), [curriculumList])

  return (
    <>
      <GlobalStyle />
      <Header />
      <Main>
        <CurriculumList
          list={curriculumList}
          remove={course => {
            setCurriculumList(curriculumList.filter(item => item !== course))
          }}
        />
        <CurriculumBrowser>
          <Subjects handleSubjects={handleSubjects} />

          {!topics ? null : (
            <Topics topics={topics} handleTopics={handleTopics} />
          )}

          {!courses ? null : (
            <Courses courses={courses} handleCourses={handleCourses} />
          )}
        </CurriculumBrowser>
        {!isVisible ? null : (
          <Modal outSideClick={handleOutSideClick}>
            <ModalBox ref={modalRef}>
              <ModalContent
                selectedCourse={selectedCourse}
                cancel={() => setIsVisible(false)}
                addCourse={addCourse}
              />
            </ModalBox>
          </Modal>
        )}
      </Main>
    </>
  )
}

function Modal({ children, outSideClick }) {
  const modalRoot = document.getElementById('modal-root')
  const element = document.createElement('div')

  useEffect(() => {
    modalRoot.appendChild(element)
    document.addEventListener('click', outSideClick)

    return () => {
      modalRoot.removeChild(element)
      document.removeEventListener('click', outSideClick)
    }
  })

  return ReactDOM.createPortal(children, element)
}
