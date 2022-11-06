import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"
import { AuthContext } from "./AuthContext"

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const validateToken = async () => {
            const storageData = localStorage.getItem('authToken');
            if(storageData){
                await axios.post("http://localhost:3000/owner", {
                    id: storageData,
                    }).then((response)=> {
                        const usuario = response.data[0].user;
                        if(usuario.length > 0){
                            setUser(usuario);
                        };
                    });
            };
        };
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

    const signout = async () => {
        setUser(null);
        setToken('');
        //await api.logout();
    }

    const setToken = (token) => {
        localStorage.setItem('authToken', token);
    }

    const register = async (user,email,password) => {
        await axios.post("http://localhost:3000/register", {
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
    }

    return (
        <AuthContext.Provider value={{user, signin, signout, register}}>
            {children}
        </AuthContext.Provider>
    )
}