import { useEffect } from "react";
import { useUserInfo } from "../contexts/Login"
import Compose from "./Compose/Compose"
import Navbar from "./Navbar/Navbar"
import Note from "./Note/Note"
import axios from "axios"

export default function App() {
    const url = "http://localhost:4000"
    const token = localStorage.getItem("token");
    console.log(token);

    const userInfo = useUserInfo();

    useEffect(()=>{
        async function checkSignin() {
            try{

                const response = await axios.get(url+`/api/auth?token=${token}`);
                console.log(response);

            }catch(err){
                console.log(err);
            }
        }
        checkSignin();
    },[])


    return (
        <div>
            <Navbar/>
            {/* <Note/> */}
            <Compose />
        </div>
    )
}