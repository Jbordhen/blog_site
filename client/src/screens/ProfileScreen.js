import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Button, CardGroup, Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { Row, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import storeContext from '../components/Store'

const ProfileScreen = ({ match }) => {
    const { profile, setProfile } = useContext(storeContext)
    const { userInfo } = useContext(storeContext)

    const history = useHistory()

    const [posts, setPosts] = useState([])

    const [error, setError] = useState('')

    useEffect(() => {
        // if (!token) {
        //     history.push('/login')
        //     // console.log(token)
        // }
        // const config = {
        //     headers: {
        //         Authorization: 'Bearer ' + token
        //     }
        // }
        const getProfile = async () => {
            try {
                const { data } = await axios.get(
                    '/api/profile/' + match.params.profile
                )
                // console.log(data)
                setProfile(data)
                setPosts(data['posts'])
            } catch (err) {
                // console.log(token)
                // console.log(err.response)
                setError(err.response.data)
            }
        }
        getProfile()
    }, [history, match.params.profile, setProfile])

    return (
        <Container className='d-flex flex-column'>
            {error && (
                <div className='card text-danger my-4 py-4 d-flex justify-content-center align-items-center'>
                    {error}
                </div>
            )}

            <div className='px-3 px-md-5 py-3'>
                <Card className='px-0 rounded-3 shadow d-flex flex-column flex-md-row w-100 py-2 py-md-4 justify-content-around align-items-center rounded shadow'>
                    <div className='d-flex flex-column flex-md-row justify-content-around align-items-center'>
                        <div className='d-flex px-3 px-md-5'>
                            <i
                                className='far fa-user'
                                style={{ fontSize: '10em' }}></i>
                        </div>
                        <div className='d-flex flex-column px-2 px-md-5 py-3 py-md-0 text-center text-md-start'>
                            <div>Username: {profile.username}</div>
                            <div>Name: {profile.name}</div>
                            <div>Email: {profile.email}</div>
                            <div>Date of Birth: {profile.dob}</div>
                            <div>Website: {profile.website}</div>
                            <div>About: {profile.bio}</div>
                            {
                                // eslint-disable-next-line eqeqeq
                                userInfo.id != match.params.profile ? (
                                    ''
                                ) : (
                                    <Link to='/profile/update'>
                                        <Button
                                            className='my-3 mx-auto mx-md-0'
                                            style={{ width: 'fit-content' }}>
                                            Update Profile
                                        </Button>
                                    </Link>
                                )
                            }
                        </div>
                    </div>
                </Card>
            </div>
            {!posts && (
                <Card className='d-flex justify-content-center align-items-center'>
                    {' '}
                    No post found for this user{' '}
                    <i className='far fa-frown gray'></i>
                </Card>
            )}

            <CardGroup className='px-3 px-md-5 py-2 d-flex flex-column'>
                {posts.map((post) => (
                    <Row className='py-3' key={post.id}>
                        <Card className='px-0 rounded-3 shadow'>
                            <Card.Header className='px-2 bg-white'>
                                <div className='d-flex flex-column flex-md-row'>
                                    <Link
                                        className='text-decoration-none text-dark text-'
                                        to={`/post/${post.id}`}>
                                        {post.title}
                                    </Link>
                                </div>
                            </Card.Header>
                            <Card.Body className='bg-gray'>
                                <p>{post.description}</p>
                            </Card.Body>
                        </Card>
                    </Row>
                ))}
            </CardGroup>
        </Container>
    )
}

export default ProfileScreen
