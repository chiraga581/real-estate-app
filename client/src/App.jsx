// eslint-disable-next-line no-unused-vars
import React from 'react'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'
import { About } from './pages/About'
import Header from './components/Header'
const App = () => {
  return (
    <BrowserRouter>
        <Header/>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/about' element={<About/>} /> 
            <Route path='/profile' element={<Profile/>} /> 
            <Route path='/sign-in' element={<SignIn/>} /> 
            <Route path='/sign-up' element={<SignUp/>} /> 
        </Routes>
    </BrowserRouter>
  )
}

export default App