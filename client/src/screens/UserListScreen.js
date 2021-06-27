import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {
    Row,
    Col,
    Card,
    Table,
    Container,
    Form,
    Button,
    DropdownButton,
    Dropdown,
    Pagination
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import storeContext from '../components/Store'

const UserListScreen = () => {
    const [users, setUsers] = useState([])

    const {
        usersField,
        setUsersField,
        usersSorting,
        setUsersSorting,
        usersPageSearch,
        setUsersPageSearch,
        usersPageSize,
        setUsersPageSize,
        usersPageNumber,
        setUsersPageNumber
    } = useContext(storeContext)

    let count = 0
    const [totalPages, setTotalPages] = useState(1)

    const [link, setLink] = useState()

    const setSortField = (sort, field) => {
        // console.log(sort + ' ' + field)
        setUsersSorting(sort)
        setUsersField(field)
    }

    // const [paginator, setPaginator] = useState(1)

    const updatePageSize = (page) => {
        // eslint-disable-next-line eqeqeq
        setUsersPageSize(page == 1 ? 10 : page == 2 ? 20 : 'All')
    }

    const [value, setValue] = useState('')

    // const paginate = () => {}

    useEffect(() => {
        setLink(
            `/api/users?show=${usersPageSize ?? 10}${
                usersPageSearch ? '&search=' + usersPageSearch : ''
            }${usersSorting ? '&sort=' + usersSorting : ''}${
                usersField ? '&field=' + usersField : ''
            }${usersPageNumber ? '&page=' + usersPageNumber : ''}`
        )
        const getUsers = async () => {
            try {
                const { data } = await axios.get(link)
                setUsers(data.users)
                setTotalPages(Math.ceil(data.totalPages))
                // console.log(link)
                // console.log('size' + usersPageSize)
                // console.log('field' + usersField)
                // console.log('page#' + usersPageNumber)
                // console.log('sort' + usersSorting)
            } catch (err) {
                // console.log(link)
                // console.log(usersSorting)
                // console.log(err.response)
            }
        }
        getUsers()
    }, [
        link,
        usersField,
        usersPageSearch,
        usersPageNumber,
        usersPageSize,
        usersSorting
    ])

    return (
        <Container fluid={'md'} className='my-3 my-md-5'>
            <Row>
                <Col>
                    <Card>
                        <Card className='p-2 d-flex justify-content-md-between flex-column flex-md-row'>
                            <DropdownButton
                                alignRight
                                title='Show'
                                id='dropdown-menu-align-right'
                                onSelect={(e) =>
                                    // console.log(e)
                                    updatePageSize(e)
                                }>
                                <Dropdown.Item eventKey='1'>10</Dropdown.Item>
                                <Dropdown.Item eventKey='2'>20</Dropdown.Item>
                                <Dropdown.Item eventKey='3'>All</Dropdown.Item>
                            </DropdownButton>
                            <Form
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    setUsersPageNumber(1)
                                    setUsersPageSearch(value)
                                }}
                                className='d-flex flex-row-reverse flex-md-row'>
                                <Button type='submit' className='mx-1'>
                                    Search
                                </Button>
                                <Form.Group>
                                    <Form.Control
                                        type='text'
                                        placeholder='Search'
                                        value={value}
                                        onChange={(e) =>
                                            setValue(e.target.value)
                                        }></Form.Control>
                                </Form.Group>
                            </Form>
                        </Card>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>
                                        Name
                                        <i
                                            style={{
                                                fontSize: '1.25em',
                                                cursor: 'pointer'
                                            }}
                                            className='fas fa-long-arrow-alt-up float-end'
                                            onClick={() =>
                                                setSortField('asc', 'name')
                                            }></i>
                                        <i
                                            style={{
                                                fontSize: '1.25em',
                                                cursor: 'pointer'
                                            }}
                                            className='fas fa-long-arrow-alt-down ml2 float-end'
                                            onClick={() =>
                                                setSortField('desc', 'name')
                                            }></i>
                                    </th>
                                    <th>
                                        Email
                                        <i
                                            style={{
                                                fontSize: '1.25em',
                                                cursor: 'pointer'
                                            }}
                                            className='fas fa-long-arrow-alt-up float-end'
                                            onClick={() =>
                                                setSortField('asc', 'email')
                                            }></i>
                                        <i
                                            style={{
                                                fontSize: '1.25em',
                                                cursor: 'pointer'
                                            }}
                                            className='fas fa-long-arrow-alt-down ml2 float-end'
                                            onClick={() =>
                                                setSortField('desc', 'email')
                                            }></i>
                                    </th>
                                    <th>Website</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{++count}</td>
                                        <td>
                                            <Link
                                                to={`/profile/${user.id}`}
                                                className='text-decoration-none text-dark'>
                                                {user.name}
                                            </Link>
                                        </td>
                                        <td>{user.email}</td>
                                        <td>{user.website}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div class='d-flex justify-content-center'>
                            <Pagination>
                                {[...Array(totalPages)].map((e, i) => (
                                    <Pagination.Item
                                        key={i}
                                        active={i === usersPageNumber}
                                        onClick={(e) =>
                                            setUsersPageNumber(i + 1)
                                        }>
                                        {i + 1}
                                    </Pagination.Item>
                                ))}
                            </Pagination>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default UserListScreen
