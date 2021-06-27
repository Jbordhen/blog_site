import React from 'react'
import { Card, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Post = ({ post }) => {
    return (
        <Row className='py-3'>
            <Card className='px-0 rounded-3 shadow'>
                <Card.Header className='px-2 bg-white'>
                    <div className='d-flex flex-column flex-md-row justify-content-start'>
                        <Link
                            className='text-decoration-none text-dark'
                            to={`/post/${post.id}`}>
                            {post.title}
                        </Link>
                        <div className='text-start ms-md-3'>
                            <Link
                                className='text-decoration-none text-black-50'
                                to={`/profile/${post.user.id}`}>
                                {post.user.name}
                            </Link>
                        </div>
                    </div>
                </Card.Header>
                <Card.Body className='bg-gray'>
                    <Link
                        to={`/post/${post.id}`}
                        className='text-dark text-decoration-none'>
                        <p>{post.description}</p>
                    </Link>
                </Card.Body>
            </Card>
        </Row>
    )
}

export default Post
