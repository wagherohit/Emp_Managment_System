import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import SignUp from './SignUp'
import Login from './Login'
import UserData from './UserData'
import ProtectedRoute from './ProtectedRoute'
import UserForm from './UserForm'
import Edit from './Edit'

const App = () => {
  return (
    <>

    <Router>
      <Routes>
        <Route path='/' element={<SignUp/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/userData' element={
          <ProtectedRoute>
          <UserData/>
          </ProtectedRoute>}/> 

        <Route path='/userForm' element={<UserForm/>}/> 
        <Route path='/edit/:id' element={<Edit/>}/>
      </Routes>
    </Router>
    
    
    </>
  )
}

export default App