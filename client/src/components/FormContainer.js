import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'

const FormContainer = ({ children }) => {
    return (
        <Container>
            <Row className='justify-content-md-center'>
                <Col xs={12} md={9} lg={7}>
                    <Card className='p-3 m-3'>{children}</Card>
                </Col>
            </Row>
        </Container>
    )
}

export default FormContainer
