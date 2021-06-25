import React from 'react'
import Hero from "../Elements/Hero";
import { Container } from 'react-bootstrap';

function Home() {
    return (
        <div>
            <Hero />
            <Container>
                Tarjetas de bienvenida. Con algunos ejemplos sencillos o articulos. 
            </Container>
        </div>
    )
}

export default Home