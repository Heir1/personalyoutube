import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, NavLink } from 'react-router-dom';

export const Siderbar = () => {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/")
    }

  return (
    <div className="col-md-2 col-sm-2 col-xs-2 sideStyle">
        <div className="row sideStyle1">
                <NavLink to={"/popularvideos"}  className={({ isActive }) => (isActive ? 'active' : 'funcStyle')} style={{ textDecoration:"none", color:'white'}}>
                    <div>
                        Home
                    </div>
                </NavLink>

                <NavLink to={"/mychannels"} className={({ isActive }) => (isActive ? 'active' : 'funcStyle')} style={{ textDecoration:"none", color:'white'}}>
                    <div>
                        Channels
                    </div>
                </NavLink>

                <NavLink to={"/mylikes"} className={({ isActive }) => (isActive ? 'active' : 'funcStyle')} style={{textDecoration:"none", color:'white'}}>
                    <div>
                        Likes
                    </div>
                </NavLink>

                <NavLink to={"/profile"} className={({ isActive }) => (isActive ? 'active' : 'funcStyle')} style={{textDecoration:"none", color:'white'}}>
                    <div>
                        Profile
                    </div>
                </NavLink>

                <div className="col-xs-3 logoutStyle">
                    <button className="btn btn-danger logoutStyle" onClick={logout} >Logout</button>
                </div>

        </div>
     
    </div>
  )
}

export default Siderbar