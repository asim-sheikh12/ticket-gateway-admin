import { Login } from '../pages/Login'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Footer, Header } from '../layouts'
import { PrivateRoutes } from './PrivateRoutes/privateRoutes'
import { PublicRoutes } from './PublicRoutes/publicRoutes'
import { privateRoutes, publicRoutes } from './RouteTypes'

const Routing = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Login />} />
        {publicRoutes?.map((route, index) => {
          return (
            <Route
              path={route.path}
              key={index}
              element={<PublicRoutes Component={route.Component} />}
            />
          )
        })}
        {privateRoutes?.map((route, index) => {
          return (
            <Route
              path={route.path}
              key={index}
              element={<PrivateRoutes Component={route.Component} />}
            />
          )
        })}
      </Routes>
      <Footer />
    </Router>
  )
}

export default Routing
