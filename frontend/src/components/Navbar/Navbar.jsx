import './Navbar.css'

export default function Navbar(){
    return(
        <div className='Navigation'>
            <div className='Titlename'>
                <p>NoteVault</p>
            </div>
            
            <div className='mainlogin'>
                <div>
                    <a>Login</a>
                </div>
                <div>
                    <button>Ragistion</button>
                </div>
            </div>
        </div>
    )
}