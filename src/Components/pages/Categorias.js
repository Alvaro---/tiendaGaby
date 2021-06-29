import React, { useState, useContext } from 'react'
import { GlobalState } from '../../GlobalState'

import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import axios from 'axios'

import API from '../../utils/const'

function Categorias() {

    const state = useContext(GlobalState);
    const [category] = state.categoryApi.category;
    // console.log(categorias)
    const [cat, setCat] = useState('');
    const [id, setId] = useState('');
    const [token] = state.token;
    const [callback, setCallback] = state.categoryApi.callback;
    const [onEdit, setOnEdit] = useState(false);


    const createCategory = async (e) => {
        e.preventDefault();
        if (onEdit) {
            try {
                const res = await axios.put(`${API.URI}/api/category/${id}`, { name: cat }, {
                    headers: { Authorization: token }
                });
            } catch (err) {
                alert(err.response.data.msg);
            }
        } else {
            try {
                const res = await axios.post(`${API.URI}/api/category`, { name: cat }, {
                    headers: { Authorization: token }
                });
            } catch (err) {
                alert(err.response.data.msg);
            }
        }
        setCat('');
        setOnEdit(false)
        setCallback(!callback);
    }

    const editarCategoria = async (id, name) => {
        setCat(name);
        setId(id);
        setOnEdit(true);
    }

    const borrarCategoria = async (id) => {
        try {
            const res = await axios.delete(`${API.URI}/api/category/${id}`, {
                headers: { Authorization: token }
            })
            setCat('');
            setOnEdit(false)
            setCallback(!callback);
        } catch (err) {
            alert(err.response.data.msg);
        }
    }

    return (
        <Container className="div_categorias">
            <Row>
                <Col md={12} lg={6} sm={12}>
                    <h2>Nueva categoria</h2>
                    <Form onSubmit={createCategory}>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="categorias"
                                value={cat}
                                placeholder="Ingresar nombre de categoria"
                                onChange={e => setCat(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Button
                                type="submit"
                                variant="primary"
                            > {onEdit ? "Editar" : "Guardar"}
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
                <Col md={12} lg={5} sm={12} className="lista">
                    <h2>Lista de categorias</h2>
                    {
                        category.map(cate => (
                            <div key={cate._id}>
                                <p>{cate.name}</p>
                                <Button variant="primary" onClick={() => editarCategoria(cate._id, cate.name)}>Edit</Button>
                                <Button variant="warning" onClick={() => borrarCategoria(cate._id)}>Delete</Button>
                            </div>
                        )
                        )
                    }
                </Col>

            </Row >
        </Container>
    )
}

export default Categorias
