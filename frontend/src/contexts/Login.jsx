import { createContext, useContext, useState } from "react";



export const LoginContext = createContext(null);

export function useUserInfo() {
    const userInfo = useContext(LoginContext);
    return userInfo;
}


export default function LoginProvider(props) {
    const [user , setUser] = useState({});
    const [isLogged , setLogged] = useState(false)
    return (
        <LoginContext.Provider value={{user , setUser , isLogged , setLogged}}>
            {props.children}
        </LoginContext.Provider>
    )
}