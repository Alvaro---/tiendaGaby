import React from 'react'
import { Container, Form, Button } from 'react-bootstrap'

function AddProduct() {
    return (
        <Container className="create_product">
            <div className="uploadImage">
                <input type="file" name="file" id="file_up" />
                
                <div id="file_img">
                    <img src="" alt="" />
                    <span>X</span>
                </div>
            </div>

            <Form>
                <Form.Group>
                    <Form.Control
                        type="text"
                        name="product_id"
                        //value={user.name}
                        placeholder="Ingresar codigo del producto"
                    //onChange={onChangeInput}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="text"
                        name="name"
                        //value={user.name}
                        placeholder="Ingresar nombre"
                    //onChange={onChangeInput}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="number"
                        name="name"
                        //value={user.name}
                        placeholder="Ingresar el precio"
                    //onChange={onChangeInput}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="text"
                        name="description"
                        //value={user.name}
                        placeholder="Ingresar una descripcion (tamaño, colores, etc...)"
                    //onChange={onChangeInput}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="text"
                        name="category"
                        //value={user.name}
                        placeholder="Categorias"
                    //onChange={onChangeInput}
                    >
                    </Form.Control>
                </Form.Group>   
                <Form.Group>
                    <Button>Guardar</Button>
                </Form.Group>
            </Form>


        </Container>
    )
}

export default AddProduct
