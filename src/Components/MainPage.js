import React, { useContext } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";

import { GlobalState } from '../GlobalState'
import { Container } from 'react-bootstrap';

function MainPage() {

    const state = useContext(GlobalState)

    const [prueba, setPrueba] = state.usuario

    console.log(prueba)


    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Container>
                <Route path="/products" exact component={Products} />
                <Route path="/login" exact component={Login} />
            </Container>
        </Switch>
    )
}

export default MainPage
