import React, { useState } from 'react'
import { Card, Form, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'

import API from '../../utils/const'

function Register() {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })

    const onChangeInput = e => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const registerSubmit = async e => {
        e.preventDefault()
        try {
            await axios.post(`${API.URI}/user/register`, { ...user })
            localStorage.setItem('firstLogin', true)

            window.location.href = "/products";

        } catch (err) {
            alert(err.response.data.msg)
        } 
    }

    return (
        <Row>
            <Col md={8} sm={10} lg={6} className="mx-auto mt-4">
                <Card className="cardLogin">
                    <Card.Header>
                        <h4>Login</h4>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={registerSubmit}>
                            <Form.Group className="mt-1">
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={user.name}
                                    placeholder="Ingresar nombre Nombre"
                                    onChange={onChangeInput}
                                />
                            </Form.Group>

                            <Form.Group className="mt-1">
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={user.correo}
                                    placeholder="Ingresar nombre correo"
                                    onChange={onChangeInput}
                                />
                            </Form.Group>

                            <Form.Group className="mt-1">
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={user.password}
                                    placeholder="Ingresar la clave"
                                    onChange={onChangeInput}
                                />
                            </Form.Group>

                            <Form.Group className="d-grid gap-2 mt-1">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="mt2">
                                    Entrar
                                </Button>
                                <Link to="/login">Ya tienes Cuenta? Ingresa Aqui</Link>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default Register
