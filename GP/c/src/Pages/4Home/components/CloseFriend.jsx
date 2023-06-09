import React from 'react'
import { NavLink } from 'react-router-dom'
import "./closeFriend.css"


export default function CloseFriend({ user }) {
  return (
    <li className="friendParent">
      <NavLink to={`/profile`} state={{ user: user }}>
        <img className='sidebarFriendImg' src={`${process.env.REACT_APP_BACKEND_LINK}/images/${user.profilePicture}`} alt="" />
        <span className='sidebarFriendName'>{" "+user.firstName+" "+user.lastName}</span> 
      </NavLink>
    </li>
  )
}
