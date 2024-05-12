import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const UserContext = createContext({});
export const UsercontextProvider = ({ children }) => {
    const [userInfo, setuserInfo] = useState("");

    useEffect(() => {
        axios.get("http://localhost:7544/profile")
            .then(({ data }) => {
                setuserInfo(data)
            })
            .catch(e => console.log(e.message))
    },[])


    return (
        <UserContext.Provider value={{ userInfo, setuserInfo }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;
