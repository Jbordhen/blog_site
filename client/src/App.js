import { BrowserRouter, Route, Switch } from 'react-router-dom'
import CreatePostScreen from './screens/CreatePostScreen'
import Footer from './components/Footer'
import Header from './components/Header'
import storeContext from './components/Store'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import MyProfileScreen from './screens/MyProfileScreen'
import RegisterScreen from './screens/RegisterScreen'
import UpdateProfileScreen from './screens/UpdateProfileScreen'
import PostScreen from './screens/PostScreen'
import ProfileScreen from './screens/ProfileScreen'
import UserListScreen from './screens/UserListScreen'
import UpdatePostScreen from './screens/UpdatePostScreen'
import useLocalStorage from './hooks/useLocalStorage'

const App = () => {
    const [token, setToken] = useLocalStorage('token', null)
    const [userInfo, setUserInfo] = useLocalStorage('userInfo', {})
    const [posts, setPosts] = useLocalStorage('posts', [])
    const [profile, setProfile] = useLocalStorage('profile', {})
    // const [usersPageDetails, setUsersPageDetails] = useLocalStorage({})
    const [usersField, setUsersField] = useLocalStorage('field', 'name')
    const [usersSorting, setUsersSorting] = useLocalStorage('sort', 'asc')
    const [usersPageSearch, setUsersPageSearch] = useLocalStorage('search', '')
    const [usersPageSize, setUsersPageSize] = useLocalStorage('size', 10)
    const [usersPageNumber, setUsersPageNumber] = useLocalStorage('number', 1)

    return (
        <storeContext.Provider
            value={{
                token,
                setToken,
                userInfo,
                setUserInfo,
                posts,
                setPosts,
                profile,
                setProfile,
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
            }}>
            <BrowserRouter>
                <Header />
                <main>
                    <Switch>
                        <Route path='/users' component={UserListScreen} />
                        <Route
                            path='/post/create'
                            component={CreatePostScreen}
                        />
                        <Route path='/register' component={RegisterScreen} />
                        <Route path='/login' component={LoginScreen} />
                        <Route
                            path='/post/:post/update'
                            component={UpdatePostScreen}
                        />
                        <Route path='/post/:post' component={PostScreen} />
                        <Route
                            exact
                            path='/profile/update'
                            component={UpdateProfileScreen}
                        />
                        <Route
                            path='/profile/:profile'
                            component={ProfileScreen}
                        />
                        <Route path='/profile' component={MyProfileScreen} />
                        <Route exact path='/' component={HomeScreen} />
                    </Switch>
                </main>
                <Footer />
            </BrowserRouter>
        </storeContext.Provider>
    )
}

export default App
