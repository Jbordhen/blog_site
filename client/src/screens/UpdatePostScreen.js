import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import storeContext from '../components/Store'

const UpdatePostScreen = ({ match }) => {
    const { token, userInfo } = useContext(storeContext)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const history = useHistory()

    const [error, setError] = useState('')

    const config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }

    const handleUpdate = () => {
        try {
            axios.patch(
                '/api/post/' + match.params.post,
                {
                    title,
                    description
                },
                config
            )
            history.goBack()
        } catch (err) {}
    }

    useEffect(() => {
        if (!token) {
            history.push('/login')
        }
        const getPost = async () => {
            try {
                const { data } = await axios.get(
                    '/api/post/' + match.params.post
                )
                setTitle(data.title)
                setDescription(data.description)
                // eslint-disable-next-line eqeqeq
                if (data.user_id != userInfo.id) {
                    history.push('/')
                }
            } catch (err) {
                // console.log(err)
                setError(err.response.data.error)
            }
        }
        getPost()
    }, [history, match.params.post, token, userInfo.id])
    return (
        <>
            <div className='col-10 col-md-10 col-lg-8'>
                <Card className='p-2'>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault()
                            handleUpdate()
                        }}>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            {error['title'] && (
                                <p className='text-danger my-0'>
                                    {error.title}
                                </p>
                            )}
                            <Form.Control
                                type='text'
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
                                as='textarea'
                                type='text'
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }></Form.Control>
                        </Form.Group>
                        <Button
                            type='submit'
                            variant='primary'
                            className='my-2'>
                            Update Post
                        </Button>
                    </Form>
                </Card>
            </div>
        </>
    )
}
export default UpdatePostScreen
