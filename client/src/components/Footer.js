import React from 'react'
import { Container } from 'react-bootstrap'

const Footer = () => {
    return (
        <div className='bg-dark text-light rounded-3'>
            <Container className='px-2 px-md-5 py-3 d-flex flex-column text-center text-md-start'>
                <h1>Blog Site</h1>
                <p>Created by Joy Bordhen</p>
                <p>Copyright 2021</p>
            </Container>
        </div>
    )
}

export default Footer
