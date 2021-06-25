import React from 'react'
import { Card, Form, Row, Col, Button } from 'react-bootstrap'

function Login() {
    return (
        <Row>
            <Col md={4} className="mx-auto mt-4">
                <Card className="cardLogin">
                    <Card.Header>
                        <h4>Login</h4>
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group className="mt-1">
                                <Form.Control
                                    type="email"
                                    name="enterUserName"
                                    placeholder="Ingresar nombre correo"
                                />
                            </Form.Group>

                            <Form.Group className="mt-1">
                                <Form.Control
                                    type="password"
                                    name="enterPassword"
                                    placeholder="Ingresar la clave"
                                />
                            </Form.Group>

                            <Form.Group className="d-grid gap-2 mt-1">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="mt2">
                                    Entrar
                                </Button>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default Login
