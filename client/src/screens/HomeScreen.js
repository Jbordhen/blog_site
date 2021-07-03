import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Button, CardGroup, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Post from '../components/Post'
import storeContext from '../components/Store'

const HomeScreen = () => {
    const { posts, setPosts } = useContext(storeContext)

    let [count, setCount] = useState(1)

    const [message, setMessage] = useState('')

    const getMorePost = async (count) => {
        try {
            const { data, message } = await axios.get(
                '/api/post?count=' + count
            )
            data ? setPosts([...posts, ...data]) : setMessage(message)
        } catch (err) {}
    }

    useEffect(() => {
        const getPost = async () => {
            try {
                const { data } = await axios.get('/api/post')
                setPosts(data)
            } catch (err) {}
        }
        getPost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container>
            <Button as={Link} to='/post/create' className='mx-2 mx-md-5 mt-4'>
                Create Post
            </Button>
            <CardGroup className='px-3 px-md-5 py-2 d-flex flex-column'>
                {posts &&
                    posts.map((post) => <Post post={post} key={post.id} />)}
            </CardGroup>
            <div className='d-flex justify-content-center'>
                {!message && (
                    <Button
                        className='mb-4'
                        onClick={(e) => {
                            e.preventDefault()
                            setCount(count + 1)
                            getMorePost(count)
                        }}
                        disabled={message ? true : false}>
                        Load More
                    </Button>
                )}
            </div>
        </Container>
    )
}

export default HomeScreen
