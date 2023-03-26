import React from 'react'

const Loading = ({msg}) => {
  return (
      <div className='loading'>{msg || "Loading content..."}</div>
  )
}

export default Loading