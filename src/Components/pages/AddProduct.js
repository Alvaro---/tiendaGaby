import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { GlobalState } from '../../GlobalState'
import { useHistory, useParams } from "react-router-dom";

import Loading from '../../loading/Loading'

function AddProduct() {

    const initialState = {
        product_id: "",
        title: "",
        price: "",
        currentAmount: "",
        description: "",
        category: "",
        _id: ''
    }

    const state = useContext(GlobalState);
    const [product, setProduct] = useState(initialState);
    const [category] = state.categoryApi.category;
    const [images, setImages] = useState(false);

    const [token] = state.token;
    const [isAdmin] = state.userApi.isAdmin;

    const [loading, setLoading] = useState(false);

    const history = useHistory()
    const param = useParams()

    const [productos, setProductos] = state.productsApi.products;
    const [callback, setCallback] = state.productsApi.callback;
    const [onEdit, setOnEdit] = useState(false);

    useEffect(() => {
        if (param.id) {
            setOnEdit(true);
            productos.forEach(producto => {
                if (producto._id === param.id) {
                    setProduct(producto)
                    setImages(producto.images)
                }
            })
        } else {
            setOnEdit(false);
            setProduct(initialState)
            setImages(false)
        }
    }, [param.id, productos])

    const handleUpload = async e => {
        e.preventDefault()
        try {
            if (!isAdmin) return alert("Ingresa con una cuenta de administrador")
            const file = e.target.files[0];
            //console.log(file)

            if (!file) return alert("Archivo no encontrado")

            if (file.size > 1024 * 1024) //1mb
                return alert("Archivo muy garnde")

            if (file.type !== 'image/jpeg' && file.type !== 'image/png') //1mb
                return alert("Formato incorrecto")

            let formData = new FormData()
            formData.append('file', file)
            setLoading(true)
            const res = await axios.post(`${API.URI}/api/upload`, formData, {
                headers: { 'content-type': 'multipart/form-data', Authorization: token }
            })
            //console.log(res)
            setImages(res.data)
            setLoading(false)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const styleImageUpload = {
        display: images ? "block" : "none",
    }

    const handleDestroy = async () => {
        try {
            if (!isAdmin) return alert("Ingresa con una cuenta de administrador")
            setLoading(true);
            await axios.post(`${API.URI}/api/destroy`, { public_id: images.public_id }, {
                headers: { Authorization: token }
            })
            setLoading(false);
            setImages(false);
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const onChangeInput = e => {
        const { name, value } = e.target
        setProduct({ ...product, [name]: value })
    }

    const guardarProducto = async e => {
        e.preventDefault()
        try {
            if (!isAdmin) return alert("Ingresa con una cuenta de administrador")
            if (!images) return alert("Ingresa una imagen")

            if (onEdit) {
                await axios.put(`${API.URI}/api/products/${product._id}`, { ...product, images }, {
                    headers: { Authorization: token }
                })
            } else {
                await axios.post(`${API.URI}/api/products`, { ...product, images }, {
                    headers: { Authorization: token }
                })
            }

            setImages(false);
            setProduct(initialState);
            setCallback(!callback);
            history.push('/products')
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    return (
        <div className="create_product">
            <div className="uploadImage">
                <input type="file" name="file" id="file_up" onChange={handleUpload} />
                {
                    loading ?
                        <div id="file_img"> <Loading /> </div>
                        :
                        <div id="file_img" style={styleImageUpload}>
                            <img src={images ? images.url : ""} alt="" />
                            <span onClick={handleDestroy}>X</span>
                        </div>
                }
            </div>
            <div>
                <Form onSubmit={guardarProducto}>
                    <h4>Datos del producto</h4>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            name="product_id"
                            value={product.product_id}
                            placeholder="Ingresar codigo del producto"
                            onChange={onChangeInput}
                            disabled={onEdit}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            name="title"
                            value={product.title}
                            placeholder="Ingresar nombre"
                            onChange={onChangeInput}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="number"
                            name="price"
                            value={product.price}
                            placeholder="Ingresar el precio"
                            onChange={onChangeInput}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="number"
                            name="currentAmount"
                            value={product.currentAmount}
                            placeholder="Cantidad existente"
                            onChange={onChangeInput}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            as="textarea" rows={3}
                            name="description"
                            value={product.description}
                            placeholder="Ingresar una descripcion (tamaño, colores, etc...)"
                            onChange={onChangeInput}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="SelectCustom">
                        <Form.Label>Category</Form.Label>
                        <Form.Control as="select" onChange={onChangeInput} name="category" value={product.category}>
                            <option value="">Selecciona una categoria</option>
                            {category.map(cat => (
                                <option key={cat._id} value={cat.name}>{cat.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Button
                            type="submit"
                            variant="primary"
                            className="mt2">{onEdit ? "Actualizar" : "Guardar"}</Button>
                    </Form.Group>
                </Form>
            </div>
        </div >
    )
}

export default AddProduct
