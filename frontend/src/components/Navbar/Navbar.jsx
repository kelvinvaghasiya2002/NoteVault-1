import { Link } from 'react-router-dom'
import './Navbar.css'
import { useUserInfo } from '../../contexts/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export default function Navbar() {
    const { user, setUser, isLogged, setLogged } = useUserInfo();
    return (
        <div className='Navigation'>
            <div className='Titlename'>
                <h1 style={{ fontWeight: 700 }}>NoteVault</h1>
            </div>

            <div className='mainlogin'>
                {
                    !isLogged ?
                        <>
                            <div>
                                <Link to="/sign-in" className='login'>Login</Link>
                            </div>
                            <div>
                                <Link to="/sign-up"> <button className='ragi_button'>Registration</button></Link>
                            </div>
                        </> :

                        <>
                            <div>
                                <Link to="/to-do" className='login'>To-Do</Link>
                            </div>
                            <div>
                                <Link to="/" className='login'>Password Manager</Link>
                            </div>
                            <div>
                                <Link>
                                    <AccountCircleIcon style={{ fontSize: "25px" }}  />
                                </Link>
                            </div>
                        </>

                }
            </div>
        </div>
    )
}