import React, { useEffect } from 'react'
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react'
import storeContext from '../components/Store'

const UpdateProfileScreen = () => {
    const { userInfo } = useContext(storeContext)

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const { token, setUserInfo } = useContext(storeContext)

    const [error, setError] = useState('')

    const history = useHistory()

    const config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(
                '/api/profile/update',
                {
                    name,
                    password
                },
                config
            )
            setUserInfo(data.user)
            history.push('/profile')
        } catch (err) {
            setError(err.response.data.error)
            // console.log(err.response.data)
        }
    }

    useEffect(() => {
        if (!token) {
            history.push('/login')
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
                        placeholder={userInfo.name}
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
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
                <div className='d-flex flex-row'>
                    <Button type='submit' variant='primary' className='my-2'>
                        <i className='fas fa-sign-in-alt'></i>Update Profile
                    </Button>
                    <Button
                        as={Link}
                        to='/profile'
                        variant='primary'
                        className='my-2 mx-2'>
                        Cancel
                    </Button>
                </div>
            </Form>
        </FormContainer>
    )
}

export default UpdateProfileScreen
