import React, { useContext } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddProduct from "./pages/AddProduct";
import Categorias from "./pages/Categorias";
import NotFound from "./pages/NotFound";

import { GlobalState } from '../GlobalState'


function MainPage() {

    const state = useContext(GlobalState)
    const [isLogged] = state.userApi.isLogged
    const [isAdmin] = state.userApi.isAdmin

    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/products" exact component={Products} />
            <Route path="/login" exact component={isLogged ? NotFound : Login} />
            <Route path="/register" exact component={isLogged ? NotFound : Register} />
            
            <Route path="/addProduct" exact component={isAdmin ? AddProduct : NotFound} />
            <Route path="/categorias" exact component={isAdmin ? Categorias : NotFound} />
        </Switch>
    )
}

export default MainPage

