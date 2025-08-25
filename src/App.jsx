import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home.jsx'
import Income from './pages/Income.jsx'
import Expense from './pages/Expense.jsx'
import Filter from './pages/Filter.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Category from './pages/Category.jsx'

const App = () => {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/category" element={<Category />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

const Root = () => {
  const isAuthenticated = !!localStorage.getItem('token')
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  )
}

export default App

// ❗❗ !! (Double NOT)
// Purpose: Converts any value to its boolean equivalent.

// Effect: First ! negates the value, second ! negates it again—resulting in the original truthiness as a boolean.
