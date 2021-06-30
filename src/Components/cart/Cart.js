import React, { useContext, useState, useEffect } from 'react'
import { GlobalState } from '../../GlobalState'
import axios from 'axios'
import { Container, Button } from 'react-bootstrap'

//import PaypalButton from './PaypalButton'
import ReactWhatsapp from 'react-whatsapp';

import API from '../../utils/const'

function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userApi.cart
    const [total, setTotal] = useState(0)
    const [token] = state.token

    const [product] = state.productsApi.products

    const [pedido, setPedido] = useState()

    useEffect(() => {
        var i = 0;
        setPedido('');
        var p = "Hola. Quiero hacer el pedido de: ";
        while (i < cart.length) {
            console.log(cart[i])
            p = p + cart[i].title + " x " + cart[i].quantity
            i++;
        }
        p=p+" En total: "+total+"Bs."
        setPedido(p);
    }, [cart, total])

    useEffect(() => {
        cart.forEach(item => {
            let existe = false;
            product.forEach(prod => {
                if (prod._id === item._id) {
                    existe = true;
                    item.currentAmount = prod.currentAmount
                    if (prod.currentAmount === 0) {
                        item.quantity = 0
                    } else {
                        if (item.quantity > prod.currentAmount) {
                            item.quantity = prod.currentAmount
                        }
                    }
                }
            })
            if (!existe) confirmedremove(item._id)
        })
        setCart([...cart])
        addToCart()
    }, [])

    useEffect(() => {
        const getTotal = () => {
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            }, 0)
            setTotal(total)
        }
        getTotal()
    }, [cart])

    const addToCart = async () => {
        await axios.patch(`${API.URI}/user/addcart`, { cart }, {
            headers: { Authorization: token }
        })
    }

    const increment = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                if (item.currentAmount === 0) {
                    item.quantity = 0
                } else {
                    item.quantity === item.currentAmount ? item.quantity = item.currentAmount : item.quantity += 1
                }
            }
        })
        setCart([...cart])
        addToCart()
    }

    const decrement = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                if (item.currentAmount === 0) {
                    item.quantity = 0
                } else {
                    item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
                }
            }
        })
        setCart([...cart])
        addToCart()
    }

    const removeProduct = (id) => {
        if (window.confirm("¿Quieres quitar esteproducto?")) {
            confirmedremove(id)
        }
    }

    const confirmedremove = (id) => {
        cart.forEach((item, index) => {
            if (item._id === id) {
                cart.splice(index, 1)
            }
        })
        setCart([...cart])
        addToCart()
    }


    if (cart.length === 0)
        return <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Cart Empty</h2>
    return (
        <Container className="productCart">
            {
                cart.map(product => (
                    <div className="detail cart" key={product._id}>
                        <img src={product.images.url} alt="" />
                        <div className="box_detail">
                            <h2>{product.title}</h2>
                            <h4>Cantidad En Stock {product.currentAmount}</h4>

                            <span>$ {product.price * product.quantity}</span>
                            <p>{product.description}</p>
                            <p>{product.content}</p>

                            <div className="amount">
                                <button onClick={() => decrement(product._id)}> - </button>
                                <span>{product.quantity}</span>
                                <button onClick={() => increment(product._id)}> + </button>
                            </div>

                            <div className="delete"
                                onClick={() => removeProduct(product._id)}>
                                X
                            </div>

                        </div>
                    </div>
                ))
            }
            <div className="total">
                <h3>Total:  $ {total}</h3>

                {/*  <PaypalButton
                    total={total}
                    tranSuccess={tranSuccess} />
              */}

                <ReactWhatsapp className="btn-Pedir" number="+591 74084619" message={pedido} >
                    Confirmar Pedido por mensaje
                </ReactWhatsapp>
            </div>

        </Container>
    )
}



export default Cart
