import React, {createContext, useState, useEffect} from 'react'

import axios from 'axios'

export const GlobalState=createContext()

export const DataProvider=({children}) =>{

    const [prueba, setPrueba] = useState("BBBS")

     const state={
        usuario: [prueba, setPrueba],
    }
    
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}