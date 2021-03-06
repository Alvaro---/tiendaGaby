import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

import UserApi from './api/UserApi'
import ProductApi from './api/ProductApi'
import CategoriasApi from './api/CategoriasApi'

import API from './utils/const'

export const GlobalState = createContext()

export const DataProvider = ({ children }) => {

    const [token, setToken] = useState(false)

    const refreshToken = async () => {
        try {
            console.log("aca problema")
            const res = await axios.get('/user/refresh_token')
            setToken(res.data.accesstoken)
            setTimeout(() => {
                refreshToken()
            }, 10 * 60 * 1000)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin')
        if (firstLogin) refreshToken()
    }, [])

    const state = {
        token: [token, setToken],
        userApi: UserApi(token),
        productsApi: ProductApi(),
        categoryApi: CategoriasApi(),
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}