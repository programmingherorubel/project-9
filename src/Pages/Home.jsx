import React from 'react'
import TaskList from '../components/home/TaskList'
import Sidebar from '../components/Sidebar/Sidebar'

const Home = () => {
  return (
    <div className="container relative">
      <Sidebar />
      <TaskList />
    </div>
  )
}

export default Home