import React from 'react'
import Hero from "../Elements/Hero";
import { Container } from 'react-bootstrap';

import Eventos from '../anuncios/Eventos'
import Pedido from '../anuncios/Pedido'

function Home() {
    return (
        <div>
            <Hero />
            <Container>
              {/*  <Eventos />
                <Pedido />*/}
            </Container>




        </div>
    )
}

export default Home