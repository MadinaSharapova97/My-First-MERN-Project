import axios from 'axios';
import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export interface SignUpProps {
    username: string,
    email: string,
    password: string
}
export interface LoginUserProps {
    username: string,
    password: string
}
export const MyContext = createContext({})

export interface ContextProps {
    isAuth?: boolean,
    isLoading?: boolean,
    getNotes?: () => Function,
    getAllNotes?: any,
    setGetAllNotes?: Dispatch<SetStateAction<[]>>,
    signUpUser?: (user: SignUpProps) => Promise<void> | undefined,
    LoginUser?: (login: LoginUserProps) => Promise<void> | undefined,
}

export interface Note {
    _id: string,
    title: string,
    text: string,
    createdAt: string,
    updatedAt: string,
}

export default function Context({ children }: any) {

    const [getAllNotes, setGetAllNotes] = useState([])
    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setIsloading] = useState(false)

    async function getNotes() {
        try {
            const res = await axios('api/notes')
            setGetAllNotes(res.data)

            console.log(res);

        } catch (error) {
            console.log(error);
        }

    }

    async function signUpUser(user: SignUpProps) {
        setIsloading(true)
        try {
            const res = await axios.post('api/users/signup', user)
            setIsAuth(true)
            setIsloading(false)
            localStorage.setItem("isAuth", "true")
            localStorage.setItem("TOKEN", res.data._id)
            
            console.log(res);
        } catch (error) {
            console.log(error);

        }
        // finally{
        //     setIsloading(false)
        // }
    }


    async function LoginUser(login: LoginUserProps) {
        setIsloading(true)
        try {
            const res = await axios.post("api/users/login", login)
            setIsAuth(true)
            setIsloading(false)

            // navigate("/notes")
            console.log(res);
            localStorage.setItem("isAuth", "true")
            localStorage.setItem("TOKEN", res.data._id)

        } catch (error) {
            console.log(error);

        }
        // finally{
        //     setIsloading(false)
        // }
    }

    return (
        <MyContext.Provider value={{
            getAllNotes,
            isAuth,
            isLoading,
            setGetAllNotes,
            getNotes,
            signUpUser,
            LoginUser
        }}>
            {children}
        </MyContext.Provider>
    )
}
