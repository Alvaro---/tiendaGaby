import React, { useContext } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddProduct from "./pages/AddProduct";
import Categorias from "./pages/Categorias";
import Detail from "./pages/Detail";
import PedidoPersonalizado from "./pages/PedidoPersonalizado";
import NotFound from "./pages/NotFound";
import Cart from "./cart/Cart";


import { GlobalState } from '../GlobalState'


function MainPage() {

    const state = useContext(GlobalState)
    const [isLogged] = state.userApi.isLogged
    const [isAdmin] = state.userApi.isAdmin

    return (
        <Switch>
            <Route path="/" exact component={Home} />

            <Route path="/products" exact component={Products} />
            <Route path="/addProduct" exact component={isAdmin ? AddProduct : NotFound} />
            <Route path="/detail/:id" exact component={Detail} />
            <Route path="/edit_product/:id" exact component={isAdmin ? AddProduct : NotFound} />

            <Route path="/categorias" exact component={isAdmin ? Categorias : NotFound} />

            <Route path="/login" exact component={isLogged ? NotFound : Login} />
            <Route path="/register" exact component={isLogged ? NotFound : Register} />

            <Route path="/PedidoPersonalizado" exact component={PedidoPersonalizado} />

            <Route path="/cart" exact component={Cart} />

        </Switch>
    )
}

export default MainPage

