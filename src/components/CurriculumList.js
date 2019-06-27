import React from 'react'
import styled from 'styled-components'

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
export default function CurriculumList({ list, remove }) {
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
