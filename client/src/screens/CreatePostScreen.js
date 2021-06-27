import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import storeContext from '../components/Store'

const CreatePostScreen = () => {
    const { token } = useContext(storeContext)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const history = useHistory()

    const [error, setError] = useState('')

    const submitHandler = async (e) => {
        e.preventDefault()
        const config = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        try {
            await axios.post(
                '/api/post',
                {
                    title,
                    description
                },
                config
            )
            setTitle('')
            setDescription('')
            history.push('/')
        } catch (err) {
            // console.log(err)
            setError(err.response.data.error)
        }
    }

    useEffect(() => {
        if (!token) {
            history.push('/login')
        }
    }, [history, token])
    return (
        <>
            <div className='col-10 col-md-10 col-lg-8'>
                <Card className='p-2'>
                    <Form onSubmit={submitHandler}>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            {error['title'] && (
                                <p className='text-danger my-0'>
                                    {error.title}
                                </p>
                            )}
                            <Form.Control
                                type='text'
                                placeholder='Post topic'
                                value={title}
                                onChange={(e) =>
                                    setTitle(e.target.value)
                                }></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            {error['description'] && (
                                <p className='text-danger my-0'>
                                    {error.description}
                                </p>
                            )}
                            <Form.Control
                                type='text'
                                as='textarea'
                                placeholder='Write about anything'
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }></Form.Control>
                        </Form.Group>
                        <Button
                            type='submit'
                            variant='primary'
                            className='my-2'>
                            Create Post
                        </Button>
                    </Form>
                </Card>
            </div>
        </>
    )
}
export default CreatePostScreen
