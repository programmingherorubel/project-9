import React from 'react'

const Error = ({error}) => {
  return (
    <div className='error'>{error || "Something went wrong"}</div>
  )
}

export default Error