import "./navbar.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";
const Navbar = () => {
  

  const [user,setUser]=useState("")

  const getData = async () => {
      try {
          const response = await axios.post('/api/auth/get-user-info-by-id',{},
              {
                  headers: {
                      Authorization: 'Bearer ' + localStorage.getItem('token')
                  },
              });
              setUser(response.data.data.name)
          console.log(response.data);

      } catch (error) {
          console.log(error);
      }
  }
  

  useEffect(() => {
      getData()
  }, [])

  
  const Logout = () => {
    
    localStorage.removeItem('token');
    
    
    window.location.href = '/login'; // Replace with your login page route
    
    return null; 
  };

  return (
    
    <div className="navbar">
    <div className="navContainer">
      <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
        <span className="logo1">BOOK ME HOTEL</span>
      </Link>
      {user ? (
        <div className="navItems">
          <span className="userName">Hello, {user}</span>
          <button className="navButton" onClick={Logout}>
            <Link to="/logout">Logout</Link>
          </button>
        </div>
      ) : (
        <div className="navItems">
           <button className="navButton">Register</button> 
          <button className="navButton">
            <Link to="/login">Login</Link>
          </button>
        </div>
      )}
    </div>
  </div>
  );
};

export default Navbar;
