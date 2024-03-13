import { useEffect } from "react";
import { useUserInfo } from "../contexts/Login"
import Compose from "./Compose/Compose"
import Navbar from "./Navbar/Navbar"
import Note from "./Note/Note"
import axios from "axios"

export default function App() {
    const url = "http://localhost:4000"
    const token = localStorage.getItem("token");
    const { user, setUser, isLogged, setLogged } = useUserInfo();
    // console.log(isLogged);


    useEffect(() => {
        async function checkSignin() {
            try {

                const response = await axios.get(url + `/api/auth?token=${token}`);
                // console.log(response.data)
                setUser(response.data.token);
                setLogged(response.data.login)

            } catch (err) {
                console.log(err);
            }
        }
        checkSignin();
    }, [])


    return (
        <div>
            <Navbar />
            {
                isLogged &&
                <>
                    <Compose />
                    <Note/>
                </>
            }
        </div>
    )
}