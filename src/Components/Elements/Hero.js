import React from 'react'
import { Button } from 'react-bootstrap'
import {Link} from 'react-router-dom'

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
                </div>
            </div>
        </div>
    )
}

export default Hero
