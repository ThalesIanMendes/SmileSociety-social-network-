import './Login.css';
import React from 'react';
import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/AuthContext";

export const Login = () => {

  //criando variaveis com usestate
  const [email,setEmail]=useState(null);
  const [password,setPassword]=useState(null);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  //enviando infos usuarios
  const handleLogin = async () => {
    if (email && password) {
      const isLogged = await auth.signin(email, password);
      if (isLogged == true) {
          navigate('/private');
      }
    }else{
      alert("Campos vazios!");
    }
  }
  
  function register(){
    navigate('/register');
  }

  return (
    <div className="bodyl">
      <div className="container">     
          <div className='form'>  
              <div id='form-group' className="form-group">
                <div className="group">

                  <input 
                  type="email"    
                  placeholder="email" 
                  onChange={(e) => setEmail(e.target.value)} />
                  <input 
                  type="password"   
                  placeholder="senha" 
                  onChange={(e) => setPassword(e.target.value)} />
                  
                  <button onClick={handleLogin}>Logar</button>

                </div>    
              </div>  
              <button onClick={register}>Register</button>
          </div>       
      </div>
    </div>
  );
}