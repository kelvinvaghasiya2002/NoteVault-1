import './Navbar.css'

export default function Navbar(){
    return(
        <div className='Navigation'>
            <div className='Titlename'>
                <p>NoteVault</p>
            </div>
            
            <div className='mainlogin'>
                <div>
                    <a href='#' className='login'>Login</a>
                </div>
                <div>
                    <button className='ragi_button'>Ragistion</button>
                </div>
            </div>
        </div>
    )
}