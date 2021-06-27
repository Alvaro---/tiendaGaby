import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import BtnRender from './BtnRender'

function ProductItem({ product, isAdmin }) {
    return (
        <Card className="product_card">
            <Link id="card_btn" to={`/detail/${product._id}`}>
                <div className="product_image">
                    <img src={product.images.url} alt="" />
                </div>
                <Card.Title className="product_box">
                    <h2 title={product.title}>{product.title}</h2>
                </Card.Title>
            </Link>
            <Card.Body className="data_box">
                <span>${product.price}</span>
                <p>{product.description}</p>
            </Card.Body>
            <Card.Footer>
                <BtnRender product={product} />
            </Card.Footer>
        </Card >
    )
}

export default ProductItem
