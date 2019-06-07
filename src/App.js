import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import styled, { createGlobalStyle } from 'styled-components'

import { loadState, saveState } from './services/storage'
import { get } from './services/api'

const SUBJECTS = {
  listing: [
    'Math',
    'Science',
    'Computing',
    'Arts and Humanities',
    'Economics and Finance',
  ],
  resources: [
    'math',
    'science',
    'computing',
    'humanities',
    'economics-finance-domain',
  ],
}

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
  const [curriculumList, setCurriculumList] = useState(loadState())
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
function Header() {
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

const ListBox = styled.div`
  color: #4caf50;
  border: 0.1em solid #4caf50;
  margin-top: 1.5em;
  width: 25%;
  height: 400px;
  overflow: auto;
  padding: 0.3%;
  border-radius: 1%;
  background-color: #fff;
  box-shadow: 2px 3px 6px #ccc;
  h3 {
    text-align: center;
    font-weight: 400;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      text-align: left;
      margin-left: 5%;
      margin-top: 3%;
    }

    li ul li {
      font-size: 0.9em;
      padding: 1%;

      a {
        text-decoration: none;
        color: #4caf50;

        :hover {
          color: #349046;
        }
      }

      button {
        background-color: #fff;
        padding: 0;
        border: none;
        font-size: 1em;
        color: #4caf50;
        text-align: left;
        text-decoration: none;
        display: inline-block;
        cursor: pointer;

        :hover {
          color: #349046;
        }
      }
    }
  }
`
function CurriculumList({ list, remove }) {
  return (
    <ListBox>
      <h3>Lesson Plan</h3>
      {list ? (
        <ul>
          {list.map(course => (
            <li key={course.internal_id}>
              {course.standalone_title}
              <ul>
                <li>
                  <a
                    href={course.url}
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    Go to course &rarr;
                  </a>
                </li>
                <li>
                  <button type="button" onClick={() => remove(course)}>
                    Remove course
                  </button>
                </li>
              </ul>
            </li>
          ))}
        </ul>
      ) : null}
    </ListBox>
  )
}

const BrowserBox = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-bottom: 2em;
  border-bottom: 0.1em solid #4caf50;
`
const BrowserButton = styled.button`
  background: #fff;
  border: 0.2em solid #4caf50;
  border-radius: 3px;
  color: #4caf50;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 0.9em;
  cursor: pointer;
  margin: 0.5em;
  padding: 0.25em 1em;
  height: ${({ height }) => (height ? height : '3.5em')};
  width: 10em;
  border-radius: 2%;
  box-shadow: 1.5px 1.5px 6px #ccc;

  span {
    margin: auto;
  }

  :hover {
    transform: scale(1.1);
  }

  :active {
    transform: scale(1.2);
    background-color: #d1fad7;
  }
`
function Subjects({ handleSubjects }) {
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

function Topics({ topics, handleTopics }) {
  return (
    <BrowserBox>
      {topics.map(topic => (
        <BrowserButton
          type="button"
          height="4.5em"
          key={topic.internal_id}
          item={topic.node_slug}
          onClick={() => {
            handleTopics(topic.node_slug)
          }}
        >
          <span>{topic.standalone_title}</span>
        </BrowserButton>
      ))}
    </BrowserBox>
  )
}

function Courses({ courses, handleCourses }) {
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
function ModalContent({ selectedCourse, cancel, addCourse }) {
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
