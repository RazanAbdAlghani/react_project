import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(localStorage.getItem('userToken'));
    const [userName, setUserName] = useState(null);
    const [count, setCount] = useState(localStorage.getItem('countNum'));
    const getUserData = () => {
        if (userToken != null) {
            const decoded = jwtDecode(userToken);
            setUserName(decoded.userName);
        }
    }
    const getCount = async () => {
        try {
            const token = localStorage.getItem("userToken");
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`,
                {
                    headers: {
                        Authorization: `Tariq__${token}`
                    }
                });
            console.log(data.products.length);
            localStorage.setItem("countNum", data.products.length);
            setCount(data.products.length);
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getUserData();
    }, [userToken]);

    useEffect(() => {
        getCount();
    }, [count]);




    return <UserContext.Provider value={{ setUserToken, userName, setUserName, setCount, count }}>
        {children}
    </UserContext.Provider>
};

export default UserContextProvider;