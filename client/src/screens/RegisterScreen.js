import React, { useEffect } from 'react'
import { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react'
import storeContext from '../components/Store'

const RegisterScreen = () => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPassword_Confirmation] = useState('')

    const { token, setToken, setUserInfo } = useContext(storeContext)

    const [error, setError] = useState('')

    const history = useHistory()

    const config = {
        headers: {
            'content-type': 'application/json'
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(
                '/api/signup',
                {
                    name,
                    username,
                    email,
                    password,
                    password_confirmation
                },
                config
            )
            setToken(data.token)
            setUserInfo(data.user)
        } catch (err) {
            setError(err.response.data.error)
            // console.log(error)
        }
    }

    useEffect(() => {
        if (token) {
            history.push('/')
        }
    }, [history, token])

    return (
        <FormContainer>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    {error['name'] && (
                        <p className='text-danger my-0'>{error.name}</p>
                    )}
                    <Form.Control
                        type='name'
                        placeholder='Enter Your Full Name'
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    {error['username'] && (
                        <p className='text-danger my-0'>{error.username}</p>
                    )}
                    <Form.Control
                        type='username'
                        placeholder='Enter Your Username'
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email Address</Form.Label>
                    {error['email'] && (
                        <p className='text-danger my-0'>{error.email}</p>
                    )}
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    {error['password'] && (
                        <p className='text-danger my-0'>{error.password}</p>
                    )}
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm Password'
                        value={password_confirmation}
                        onChange={(e) =>
                            setPassword_Confirmation(e.target.value)
                        }></Form.Control>
                </Form.Group>
                <Button
                    type='submit'
                    variant='primary'
                    disabled={password !== password_confirmation ? true : false}
                    className='my-2'>
                    <i className='fas fa-sign-in-alt'></i>Register
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Already have an account?{' '}
                    <Link
                        to={
                            // redirect ? `/login/redirect=${redirect}` : '/login'
                            '/login'
                        }
                        className='text-secondary text-decoration-none'>
                        Login
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
