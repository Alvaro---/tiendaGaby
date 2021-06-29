import React, { useState } from 'react'
import { Card, Row } from 'react-bootstrap'
import BtnRender from './BtnRender'
import axios from 'axios'

import Loading from "../../loading/Loading";

function ProductItem({ product, isAdmin, token, callback, setCallback }) {

    const [loading, setloading] = useState(false)

    const deleteProduct = async () => {
        try {
            setloading(true);
            const destroyImg = axios.post('/api/destroy', { public_id: product.images.public_id }, {
                headers: { Authorization: token }
            })

            const deleteProd = axios.delete(`/api/products/${product._id}`, {
                headers: { Authorization: token }
            })

            await destroyImg;
            await deleteProd;
            setloading(false);
            setCallback(!callback);

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    if (loading) return (<Card className="product_card"> <Loading /> </Card>)
    return (
        <Card className="product_card">
            {
                isAdmin && <input type="checkbox" checked={product.checked} />
            }
            <div className="product_image">
                <img src={product.images.url} alt="" />
            </div>
            <Card.Title className="product_box">
                <h4 title={product.title}>{product.title}</h4>
            </Card.Title>
            <Card.Body className="data_box">
                <Row>
                    <span>{product.price} Bs.</span>
                    <h6>{product.category}</h6>
                </Row>
                <p>{product.description}</p>
            </Card.Body>
            <Card.Footer>
                <BtnRender product={product} deleteProduct={deleteProduct} />
            </Card.Footer>
        </Card >
    )
}

export default ProductItem
