import { useState } from "react"
import "./signin.css"


export default function SignIn() {

    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    function handleChange(event) {
        console.log(event.target.name);
        // const name = event.target.name;
        // const value = event.target.value;
        const { name: name, value: value } = event.target;
        setUser((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        setUser({ username: "", password: "" });
    }



    return (
        <>
            <form className="sign-in-form">
                <h2 className="title">Sign in</h2>
                <div className="input-field">
                    <i className="fas fa-user"></i>
                    <input name="username" onChange={handleChange} value={user.username} type="text" placeholder="Username" />
                </div>
                <div className="input-field">
                    <i className="fas fa-lock"></i>
                    <input name="password" onChange={handleChange} value={user.password} type="password" placeholder="Password" />
                </div>
                {/* <input type="submit" value="Login" className="btn" /> */}
                <button onClick={handleSubmit} type="submit" className="btn">Login</button>
            </form>
        </>
    )
}