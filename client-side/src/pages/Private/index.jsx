import './Private.css';
import axios from 'axios';
import React from 'react';
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { AiOutlineSend, AiOutlineSetting } from "react-icons/ai";

export const Private = () => {

  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const user = auth.user;
  const idUse = localStorage.getItem('authToken');
  
  function clearInputs(){
    document.getElementById('textArea').value = '';
  };
 
  async function getPost(){
    let data = await fetch("http://localhost:3000/postagens")
    let result = await data.json();
    let tPost = document.getElementById('post-interno');
    tPost.innerHTML = '';
    for(let i = result.length-1; i >= 0; i--){
      await axios.post("http://localhost:3000/owner", {
        id: result[i].owner
      }).then((respon)=> {
        tPost.innerHTML += `<div class="postPrivate"><div class="bolinhaPrivate"></div><h4 id="ownerH4">${respon.data[0].user} :</h4><p>${result[i].text}</p></div>`;
      });
    };
  };
  getPost();
 
  const handleClickPost = () =>{
    const post = document.getElementById('textArea').value;
    if(post){
      axios.post("http://localhost:3000/post", {
        owner: idUse,
        text: post,
      });
      getPost();
      clearInputs();
    }; 
  };

  const handleExit = () => {
    auth.signout();
    navigate('/login');
  }

  return (
    <div className="bodyPrivate">
      <div className="containerPrivate">     
          <div className='formPrivate'>
              <div id='form-group' className="form-groupPrivate">
                <div className="groupPrivate">
                  <div className='postsPrivate'>
                    <div id='post-interno' className="post-internosPrivate">
                      
                    </div>
                  </div>
                  <div className="textarea-formPrivate">
                    <textarea id='textArea' cols="30" rows="5"></textarea>
                  </div>
                  <button onClick={handleClickPost}><AiOutlineSend className='seta'/></button>
                </div>
              </div> 
          </div>
          <div className="form-inferiorPrivate">
            <div className="user-namePrivate">
              <h3>{user}</h3>
              <AiOutlineSetting className='conf' />
            </div>
            <button onClick={handleExit}  className="btn-exitPrivate">exit</button>
          </div>                
      </div>
    </div>
  );
}
