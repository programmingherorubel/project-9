import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import AddTask from './Pages/AddTask'
import EditTask from './Pages/EditTask'
import Home from './Pages/Home'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/new' element={<AddTask />} />
        <Route path='/edit/:taskId' element={<EditTask />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App