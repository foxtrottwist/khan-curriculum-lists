import React from 'react'

import { BrowserBox, BrowserButton } from '../utils/styles'

export default function Topics({ topics, handleTopics }) {
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
