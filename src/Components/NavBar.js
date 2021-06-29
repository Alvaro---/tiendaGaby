import { useContext } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { GlobalState } from '../GlobalState'
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import { faHome } from "@fortawesome/free-solid-svg-icons";


function NavBar() {

    const state = useContext(GlobalState)

    const [isLogged] = state.userApi.isLogged;
    const [isAdmin] = state.userApi.isAdmin;
    const [cart] = state.userApi.cart;
    const [userName] = state.userApi.userName;

    const logoutUser = async () => {
        await axios.get('user/logout')
        localStorage.clear()
        // setIsAdmin(false)
        // setIsLogged(false)
        window.location.href = "/";
    }

    const rutasAdmin = () => {
        return (
            <>
                <Nav.Link as={Link} to="/addProduct">Crear Producto</Nav.Link>
                <Nav.Link as={Link} to="/categorias"> Categorias</Nav.Link>
            </>
        )
    }

    const rutasUsuario = () => {
        return (
            <>
                {/*    <Nav.Link as={Link} to="/">Historial</Nav.Link> */}
                <Nav.Link as={Link} to="/" onClick={logoutUser}>LogOut</Nav.Link>
            </>
        )
    }

    const saludo = () => {
        return (
            <h6>user: {userName}</h6>
        )
    }


    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Gaby Manualidades</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {isLogged && saludo()}
                        <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                        <Nav.Link as={Link} to="/products">
                            {isAdmin ? "Editar productos" : "Catalogo"}
                        </Nav.Link>
                        {isAdmin && rutasAdmin()}
                        {/*<Nav.Link as={Link} to="/PedidoPersonalizado">Hacer un pedido</Nav.Link>*/}
                        {isLogged ?
                            rutasUsuario() :
                            <Nav.Link as={Link} to="/login">Login - Register</Nav.Link>
                        }
                        {
                            isAdmin ? ''
                                :
                                <div className="cart-icon">
                                    <span>{cart.length}</span>
                                    <Nav.Link as={Link} to="/cart">
                                        <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                                    </Nav.Link>
                                </div>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar
