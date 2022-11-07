import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "./AuthContext";


export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [id, setId] = useState(null);

    useEffect(() => {
        const validateToken = async () => {
            const storageData = localStorage.getItem('authToken');
            if(storageData){
                await axios.post("http://localhost:3000/token", {
                    token: storageData,
                }).then( async (response)=> {
                    const usuario = await response.data[0].user;
                    const id = await response.data[0].id;
                    if(usuario.length > 0){
                        setUser(usuario);
                        setId(id)
                    };
                });
            };
        };
        const eadm = () => {
            
        }
        eadm();
        validateToken();
    }, []);

    const signin = async (email, password) => {
        let confere = false;
        await axios.post("http://localhost:3000/login", {
        email: email,
        password: password,
        }).then(async(response)=> {
            if(response.data.msg.length > 25){
                alert(response.data.msg);
                setUser(response.data.user);
                setId(response.data.id)
                setToken(response.data.token);
                confere = true;
            }else{
                alert(response.data.msg);
                confere = false;
            }
        }).catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                confere = false;
            }; 
        });
        if(confere == true){
            return true;
        }
        if(confere == false){
            return false;
        };
    };

    const signout = () => {
        setUser(null);
        setId(null);
        setToken('');
    }

    const setToken = (token) => {
        localStorage.setItem('authToken', token);
    }

    const register = async (user,email,password) => {
        const ids =  await axios.get("http://localhost:3000/wId");   
        const ultimoId = Number(ids.data.msg)+1;
        const token = (ultimoId * 5250) * 18;
        await axios.post("http://localhost:3000/register", {
            token: token,
            user: user,
            email: email,
            password: password,
        }).then((response)=> {
            alert(response.data.msg);
        }).catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            };
        });
    };

    return (
        <AuthContext.Provider value={{user, id, signin, signout, register}}>
            {children}
        </AuthContext.Provider>
    )
}