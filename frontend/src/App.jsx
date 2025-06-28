import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register/Register'
import SignIn from './pages/SignIn/SignIn'
import Contents from './pages/Content/Contents'
const App = () => {
  return (
    <>
    <Routes>
      <Route path='/register' element={<Register/>} />
      <Route path='/sign-in' element={<SignIn/>}/>
      <Route path='/contents' element={<Contents/>}/>
      {/* <Route path='/login' element={
        <div className="outer">
        <Media/>
        <div className="contain">
          <Navbar/>
        </div>
      </div>
      } /> */}
    </Routes>
    
    </>
      
  )
}

export default App
