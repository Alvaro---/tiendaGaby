import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'
import ProductItem from '../Elements/ProductItem'

function Detail() {
    const params = useParams();
    //console.log(params.id)
    const state = useContext(GlobalState);
    const [productos] = state.productsApi.products;
    const [detailProduct, setDetailProduct] = useState([]);
    const addCart = state.userApi.addCart

    useEffect(() => {
        if (params) {
            productos.forEach(producto => {
                if (producto._id === params.id) setDetailProduct(producto)
            })
        }
    }, [params, productos])

    if (detailProduct.length === 0)
        return null;

    return (
        <>
            <div className="detail">
                <img src={detailProduct.images.url} alt="imagen" />
                <div className="box_detail">
                    <div className="row">
                        <h2>{detailProduct.title}</h2>
                        <h6>#id: {detailProduct.product_id}</h6>
                    </div>
                    <span>{detailProduct.price}</span>
                    <p>{detailProduct.description}</p>
                    <p>{detailProduct.content}</p>
                    <p>Vendidos:{detailProduct.sold}</p>
                    <Link to="/cart" className="cart" onClick={()=>addCart(detailProduct)}>Comprar Ahora</Link>
                </div>
            </div>

            <div>
                <h2>Productos relacionados</h2>
                <div className="products">
                    {
                        productos.map(product => {
                            return product.category === detailProduct.category
                                ? <ProductItem key={product._id} product={product} /> : null
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Detail
