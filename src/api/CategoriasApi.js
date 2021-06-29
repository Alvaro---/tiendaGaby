import { useState, useEffect } from 'react'
import axios from 'axios'

import API from '../utils/const'

function CategoriasApi() {

    const [category, setCategory] = useState([]);
    const [callback, setCallback] = useState(false);

    const getCategories = async () => {
        const res = await axios.get(`${API.URI}/api/category`)
        console.log(res)
        setCategory(res.data.categories)
    }

    useEffect(() => {
        getCategories()
    }, [callback])


    return {
        category: [category, setCategory],
        callback: [callback, setCallback]
    }
}

export default CategoriasApi
