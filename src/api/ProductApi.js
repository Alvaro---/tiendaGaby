import { useState, useEffect } from 'react'
import axios from 'axios'

import API from '../utils/const'

function ProductsApi() {

    const [products, setProducts] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() => {
        const getProducts = async () => {
            const res = await axios.get(`${API.URI}/api/products`)
            console.log(res)
            setProducts(res.data.products)
        }
        getProducts()
    }, [callback])


    return {
        products: [products, setProducts],
        callback: [callback, setCallback]
    }
}

export default ProductsApi
