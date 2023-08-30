import React, { useContext } from 'react'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import GetNotesPage from '../pages/GetNotesPage'
import SignUpPage from '../pages/SignUpPage'
import LoginPage from '../pages/LoginPage'
import Loading from '../components/Loading'
import { ContextProps, MyContext } from '../context/Context'

export default function RoutesNotes() {
  const { isLoading } = useContext<ContextProps>(MyContext)

  const isAuth = localStorage.getItem("isAuth")

  if (isLoading) return <Loading />

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
