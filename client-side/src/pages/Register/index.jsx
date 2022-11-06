import './Register.css';
import React from 'react';
import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/AuthContext";

export const Register = () => {

  //criando variaveis com usestate
  const [user,setUser]=useState(null);
  const [email,setEmail]=useState(null);
  const [password,setPassword]=useState(null);
  const [passwordConfirm,setPasswordConfirm]=useState(null);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  //enviando infos usuarios
  const handleRegister = async () => {
    if(user && email && password && passwordConfirm){
      if(password == passwordConfirm && password.length >= 5){
        await auth.register(user,email, password);
      }else{
          alert('Senhas diferentes ou tamanho menor que 5!');
      };
      }else{
      alert('Campos vazios!');
      };
  };

  function login(){
    navigate('/login');
  }

  return (
    <div className="bodyr">
      <div className="container2">     
          <div className='form2'>  
              <div id='form-group2' className="form-group2">
                <div className="group2">
                  <input type="text" className="form-control" id="user" placeholder="user" onChange={(e) => setUser(e.target.value)}/>
                  <input type="email" className="form-control" id="email2" placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
                  <input type="password" className="form-control" id="password2" placeholder="senha" onChange={(e) => setPassword(e.target.value)}/>
                  <input type="password" className="form-control" id="password3" placeholder="senha novamente" onChange={(e) => setPasswordConfirm(e.target.value)}/>
                  <button onClick={handleRegister}>Cadastrar</button>
                </div>
              </div> 
              <button onClick={login}>Login</button>   
          </div>           
      </div>
    </div>
  );
}
