import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { useContext } from 'react'
import storeContext from './Store'

const Header = () => {
    const { token, setToken, setUserInfo } = useContext(storeContext)

    const history = useHistory()

    const handleLogout = () => {
        setToken('')
        setUserInfo({})
        history.push('/')
    }

    return (
        <div className='bg-dark border-bottom grey shadow-lg rounded-3'>
            <Container>
                <h1 className='d-flex justify-content-center align-items-center py-2 text-light'>
                    Blog Site
                </h1>
                <nav className='nav nav-item d-flex justify-content-around justify-content-md-center px-sm-5 py-2'>
                    <Link
                        className='text-decoration-none blue px-sm-4 text-light'
                        to='/'>
                        Home
                    </Link>
                    <Link
                        className='text-decoration-none blue px-sm-4 text-light'
                        to='/users'>
                        Users
                    </Link>
                    <Link
                        className='text-decoration-none blue px-sm-4 text-light'
                        to='/profile'>
                        My Profile
                    </Link>
                    {token ? (
                        <Link
                            className='text-decoration-none blue px-sm-4 text-light'
                            onClick={handleLogout}
                            to='#'>
                            Logout
                        </Link>
                    ) : (
                        <Link
                            className='text-decoration-none blue px-sm-4 text-light'
                            to='/login'>
                            Login
                        </Link>
                    )}
                </nav>
            </Container>
        </div>
    )
}

export default Header
