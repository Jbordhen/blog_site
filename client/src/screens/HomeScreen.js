import axios from 'axios'
import React, { useEffect } from 'react'
import { useContext } from 'react'
import { Button, CardGroup, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Post from '../components/Post'
import storeContext from '../components/Store'

const HomeScreen = () => {
    const { posts, setPosts } = useContext(storeContext)

    useEffect(() => {
        const getPost = async () => {
            try {
                const { data } = await axios.get('/api/post')
                // console.log(data)
                setPosts(data)
            } catch (err) {}
        }
        getPost()
    }, [setPosts])

    return (
        <Container>
            <Button as={Link} to='/post/create' className='mx-2 mx-md-5 my-2'>
                Create Post
            </Button>
            <CardGroup className='px-3 px-md-5 py-2 d-flex flex-column'>
                {posts.map((post) => (
                    <Post post={post} key={post.id} />
                ))}
            </CardGroup>
        </Container>
    )
}

export default HomeScreen
