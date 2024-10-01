import React from 'react'
import Navbar from './components/nav-bar/Navbar'
import Dashboard from './components/dash-board/Dashboard'
import Home from './components/home/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './components/register/Register'
import Login from './components/register/Login'
import IncompleteTask from './components/dash-board/IncompleteTask'
import TodoTask from './components/dash-board/TodoTask'
import CompleteTask from './components/dash-board/CompleteTask'
import FinishTask from './components/dash-board/FinishTask'
import AdminRegister from './components/registeradmin/AdminRegister'
import AdminLogin from './components/registeradmin/AdminLogin'

function App() {
  return (
    <>
     <BrowserRouter>
     <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='adminregister' element={<AdminRegister/>}/>
      <Route path='adminlogin' element={<AdminLogin/>}/>
      <Route path='dashboard' element={<Dashboard/>}>
            <Route path='incompletetask' element={<IncompleteTask/>}/>
            <Route path='todotask' element={<TodoTask/>}/>
            <Route path='completetask' element={<CompleteTask/>}/>
            <Route path='finishtask' element={<FinishTask/>}/>
      </Route>

     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
