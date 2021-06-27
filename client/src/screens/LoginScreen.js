import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useContext } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import storeContext from '../components/Store'

const LoginScreen = () => {
    const [user_info, setUser_Info] = useState('')
    const [password, setPassword] = useState('')

    const { token, setToken, setUserInfo } = useContext(storeContext)

    const [error, setError] = useState([])

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
                '/api/login',
                {
                    user_info,
                    password
                },
                config
            )
            // console.log(data.token)
            setToken(data.token)
            setUserInfo(data.user)
            // console.log(userInfo)
        } catch (err) {
            // console.log(err.response.data)
            setError(err.response.data.error)
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
                    <Form.Label>Username or Email Address</Form.Label>
                    {error['user_info'] && (
                        <p className='text-danger my-0'>{error.user_info}</p>
                    )}
                    <Form.Control
                        type='text'
                        placeholder='Username or Email Address'
                        value={user_info}
                        onChange={(e) =>
                            setUser_Info(e.target.value)
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
                <Button type='submit' variant='primary' className='my-2'>
                    <i className='fas fa-sign-in-alt'></i>Login
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Don't have an account?
                    <Link
                        to={
                            // redirect ? `/login/redirect=${redirect}` : '/login'
                            '/register'
                        }
                        className='text-decoration-none text-secondary mx-2'>
                        Register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
