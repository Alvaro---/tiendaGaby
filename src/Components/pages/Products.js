import React, { useContext } from 'react'
import { GlobalState } from '../../GlobalState'
import ProductItem from '../Elements/ProductItem'
import {Container} from 'react-bootstrap'

function Products() {

    const state = useContext(GlobalState)
    const [products] = state.productsApi.products
    const [isAdmin] = state.userApi.isAdmin

    return (
        <Container>
            <h1>Productos a la venta:</h1>
            <div className="products">
                {
                    products.map(product => {
                        return <ProductItem
                            key={product._id}
                            product={product}
                            isAdmin={isAdmin} />
                    })
                }
            </div>
        </Container>
    )
}

export default Products
