import axios from 'axios'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { Container, Card, Row, Form, Button, Col } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import storeContext from '../components/Store'

const PostScreen = ({ match }) => {
    const [post, setPost] = useState({})

    const [error, setError] = useState('')
    const [commentError, setCommentError] = useState('')

    const { token, userInfo } = useContext(storeContext)

    const post_id = match.params.post
    const [success, setSuccess] = useState(false)

    const [description, setDescription] = useState('')

    const history = useHistory()

    const config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        setSuccess(false)
        if (!token) {
            history.push('/login')
        }
        try {
            await axios.post(
                '/api/comment',
                {
                    description,
                    post_id
                },
                config
            )
            setDescription('')
            setSuccess(true)
        } catch (err) {
            setCommentError(err.response.data.error)
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete('/api/post/' + id, config)
            history.goBack()
        } catch (err) {}
    }

    const handleCommentDelete = async (id) => {
        setSuccess(false)
        try {
            await axios.delete('/api/comment/' + id, config)
            setSuccess(true)
        } catch (err) {}
    }

    useEffect(() => {
        if (success) {
            history.push(`/post/${post_id}`)
        }
        const getPost = async () => {
            try {
                const { data } = await axios.get('/api/post/' + post_id)
                // console.log(data)
                setPost(data)
            } catch (err) {
                // console.log(err.response)
                setError(err.response.data)
            }
        }
        getPost()
    }, [history, post_id, setPost, success])

    return (
        <Container>
            {error ? (
                <div className='card text-danger my-4 py-4 d-flex justify-content-center align-items-center'>
                    No post found.
                </div>
            ) : (
                <>
                    <Row className='py-5 mx-md-auto d-flex justify-content-center'>
                        <Col className='col-12 col-md-10 col-lg-8'>
                            <Card className='px-0 rounded-3 shadow'>
                                <Card.Header className='px-2 bg-white d-flex flex-row justify-content-between'>
                                    <div className='d-flex flex-column flex-md-row'>
                                        <Link
                                            className='text-decoration-none text-dark text-'
                                            to={`/post/${post.id}`}>
                                            {post.title}
                                        </Link>
                                    </div>
                                    <div className='d-flex flex-row'>
                                        {
                                            // eslint-disable-next-line eqeqeq
                                            post.user_id == userInfo.id ? (
                                                <div>
                                                    <i
                                                        className='fas fa-edit text-info mx-2'
                                                        style={{
                                                            cursor: 'pointer'
                                                        }}
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            history.push(
                                                                `/post/${post.id}/update`
                                                            )
                                                        }}></i>
                                                </div>
                                            ) : (
                                                ''
                                            )
                                        }
                                        {
                                            // eslint-disable-next-line eqeqeq
                                            post.user_id == userInfo.id ? (
                                                <div>
                                                    <i
                                                        className='fas fa-trash text-danger mx-2'
                                                        style={{
                                                            cursor: 'pointer'
                                                        }}
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            handleDelete(
                                                                post.id
                                                            )
                                                        }}></i>
                                                </div>
                                            ) : (
                                                ''
                                            )
                                        }
                                    </div>
                                </Card.Header>
                                <Card.Body className='bg-gray'>
                                    <p>{post.description}</p>
                                </Card.Body>
                                <Card className='p-2 mx-md-4 border-0'>
                                    {commentError['description'] && (
                                        <p className='text-danger text-start mx-2'>
                                            {commentError['description']}
                                        </p>
                                    )}
                                    <Form onSubmit={submitHandler}>
                                        <Form.Group>
                                            {error['description'] && (
                                                <p className='text-danger my-0'>
                                                    {error.description}
                                                </p>
                                            )}
                                            <Form.Control
                                                type='description'
                                                as='textarea'
                                                placeholder='Write a comment'
                                                value={description}
                                                onChange={(e) =>
                                                    setDescription(
                                                        e.target.value
                                                    )
                                                }></Form.Control>
                                        </Form.Group>
                                        <Button
                                            type='submit'
                                            variant='primary'
                                            className='my-2'>
                                            Comment
                                        </Button>
                                    </Form>
                                    {post?.comments?.map((comment) => (
                                        <Row
                                            className='py-1 mx-0 mx-md-1 d-flex justify-content-start'
                                            key={comment.id}>
                                            <Card className='px-0 rounded-3 shadow-sm '>
                                                <div className='d-flex flex-row justify-content-between'>
                                                    <div className='d-flex flex-column flex-md-row mx-2'>
                                                        <Link
                                                            className='text-decoration-none text-dark mx-2'
                                                            to={`/profile/${comment.user.id}`}>
                                                            {
                                                                comment.user
                                                                    .username
                                                            }
                                                        </Link>
                                                    </div>
                                                    {
                                                        // eslint-disable-next-line eqeqeq
                                                        post.user_id ==
                                                            userInfo.id ||
                                                        // eslint-disable-next-line eqeqeq
                                                        comment.user_id ==
                                                            userInfo.id ? (
                                                            <div>
                                                                <i
                                                                    className='fas fa-trash text-danger mx-2'
                                                                    style={{
                                                                        cursor: 'pointer'
                                                                    }}
                                                                    onClick={(
                                                                        e
                                                                    ) => {
                                                                        e.preventDefault()
                                                                        handleCommentDelete(
                                                                            comment.id
                                                                        )
                                                                    }}></i>
                                                            </div>
                                                        ) : (
                                                            ''
                                                        )
                                                    }
                                                </div>
                                                <Card.Body className='bg-gray'>
                                                    <p>{comment.description}</p>
                                                </Card.Body>
                                            </Card>
                                        </Row>
                                    ))}
                                </Card>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    )
}

export default PostScreen
