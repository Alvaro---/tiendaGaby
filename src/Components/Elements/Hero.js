import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import ReactWhatsapp from 'react-whatsapp';

function Hero() {
    return (
        <div className="jumbotron">
            <div className="lineColor">
                <h1>Gaby Manualidades</h1>
                <p>
                    Los mejores regalos para ti.
                </p>
                <div>
                    <Button variant="primary" as={Link} to="/products">Catalogo</Button>
                    <ReactWhatsapp className="btn-Pedir" number="+591 74084619" message="Hola. Quiero hacer un pedido personalizado..." >
                        Hacer un pedido Personalizado
                    </ReactWhatsapp>
                </div>
            </div>
        </div>
    )
}

export default Hero
