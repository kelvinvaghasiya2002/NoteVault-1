import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar(){
    return(
        <div className='Navigation'>
            <div className='Titlename'>
                <h1 style={{fontWeight : 700}}>NoteVault</h1>
            </div>
            
            <div className='mainlogin'>
                <div>
                    {/* <a href='#' className='login'>Login</a> */}
                    <Link to="/sign-in" className='login'>Login</Link>
                </div>
                <div>
                    {/* <button className='ragi_button'>Registration</button> */}
                    <Link to="/sign-up"> <button className='ragi_button'>Registration</button></Link>
                </div>
            </div>
        </div>
    )
}