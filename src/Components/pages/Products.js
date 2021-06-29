import React, { useContext } from 'react'
import { GlobalState } from '../../GlobalState'
import ProductItem from '../Elements/ProductItem'
import { Container } from 'react-bootstrap'
import ReactWhatsapp from 'react-whatsapp';

function Products() {

    const state = useContext(GlobalState)
    const [products] = state.productsApi.products
    const [isAdmin] = state.userApi.isAdmin
    const [token] = state.token;
    const [callback, setCallback] = state.productsApi.callback

    return (
        <Container>
            <div className="rowContainerBanner">
                <h2>¿No encuentras lo que buscas?</h2>
                <ReactWhatsapp className="btn-Pedir" number="+591 74084619" message="Hola. Quiero hacer un pedido personalizado..." >
                    Haz un pedido aquí
                </ReactWhatsapp>
            </div>
            <h1>Productos a la venta:</h1>
            <div className="products">
                {
                    products.map(product => {
                        return <ProductItem
                            key={product._id}
                            product={product}
                            isAdmin={isAdmin}
                            token={token}
                            callback={callback}
                            setCallback={setCallback}
                        />
                    })
                }
            </div>
        </Container>
    )
}

export default Products
