import React from 'react'
import { Outlet , Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
export const PrivateRoute = () => {
    const {currentUser} = useSelector((store) => store.user)
    return currentUser ? <Outlet /> : <Navigate to="/sign-in"/>;
}
