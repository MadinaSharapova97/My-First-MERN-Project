import React, { useContext } from 'react'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import GetNotesPage from '../pages/GetNotesPage'
import SignUpPage from '../pages/SignUpPage'
import LoginPage from '../pages/LoginPage'
// import { ContextProps, MyContext } from '../context/Context'

export default function RoutesNotes() {
  // const { isAuth } = useContext<ContextProps>(MyContext)

  const isAuth = localStorage.getItem("isAuth")

  if (isAuth) {
    return (
      <Routes>
        <Route path='notes' element={<GetNotesPage />} />
        <Route path='*' element={<Navigate to='/notes' />} />
      </Routes>
    )
  }

  return (

    <Routes>
      <Route path='login' element={<LoginPage />} />
      <Route path='signup' element={<SignUpPage />} />
      <Route path='*' element={<Navigate to='/login' />} />
    </Routes>

  )
}
