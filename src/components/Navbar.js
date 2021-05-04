import React ,{ useEffect, useState } from 'react'
import logo from "./blogger.png"
import { useAuth } from "../contexts/AuthContext"
import "../styles/dashboard.css"

export default function Navbar() {

    const {currentUser}=useAuth()

    return (
        <nav className="navbar navbar-inverse " style={{backgroundColor:"#263238",padding:"30px",color:"#eceff1"}}>
          <div className="container-fluid">
            <div className="navbar-header" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                <img src={logo} className="logo" />
              <div className="navbar-brand" style={{fontSize:"25px",fontWeight:"bolder",marginLeft:"30px"}} >Blogify</div>
            </div>
            {
                currentUser ? <div className="userdata"><strong>Welcome </strong>{currentUser.email}</div> : <div>Login to start blogging!</div>   
            }
          </div>
        </nav>
    )
}
