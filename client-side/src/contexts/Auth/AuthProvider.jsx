import axios from "axios";
import { useState } from "react"
import { AuthContext } from "./AuthContext"

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);

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

    return (
        <AuthContext.Provider value={{user, signin, signout}}>
            {children}
        </AuthContext.Provider>
    )
}