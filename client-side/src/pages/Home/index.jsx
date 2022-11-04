import './Login.css';
import React from 'react';
import { useNavigate } from "react-router-dom";

export const Home = () => {
  
  const navigate = useNavigate();

  //zerando usestate
  function login(){
    navigate('/login');
  }
  //enviando infos usuarios
  const register = () => {
    navigate('/register');
  }
  
  return (
    <div className="bodyHome">
      <div className="containerHome">           
        <button onClick={login}>Login</button>
        <button onClick={register}>Register</button>                    
      </div>
    </div>
  );
}