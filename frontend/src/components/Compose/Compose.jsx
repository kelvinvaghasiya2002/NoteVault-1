import Zoom from '@mui/material/Zoom';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { useEffect, useRef, useState } from 'react';
import "./compose.css"
import axios from 'axios';
import { useUserInfo } from '../../contexts/Login';


export default function Compose() {
    const [clicked, setClicked] = useState(false);
    const { user, setUser, isLogged, setLogged } = useUserInfo();

    const url = "http://localhost:4000"

    const composeRef = useRef();

    const [note, setNote] = useState({
        title: "",
        content: ""
    })

    function handleClick() {
        setClicked(true);
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setNote((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    function handleSubmit(event) {
        event.preventDefault();

        async function saveNote() {
            try {
                const response = await axios.post(url+`/save-notes/${user._id}?title=${note.title}&content=${note.content}`);
                return response.data.result
                
            } catch (err) {
                console.log(err);
            }
        }
        saveNote().then((data)=>{
            setUser(data)
        }).catch((err)=>{
            console.log(err);
        });

        setNote({
            title: "",
            content: ""
        })

        setClicked(false)
    }

    useEffect(() => {
        function handler(e) {
            if (!composeRef.current.contains(e.target)) {
                setClicked(false);
            }
        }
        document.addEventListener("mousedown", handler)

        return () => {
            document.removeEventListener("mousedown", handler)
        }
    })

    return (
        <div >
            <form ref={composeRef} className="create-note">
                {
                    clicked &&
                    <input
                        onChange={handleChange}
                        name="title"
                        placeholder="Title"
                        value={note.title}
                        spellCheck="false" />
                }

                {clicked && <br />}


                <textarea
                    onChange={handleChange}
                    onClick={handleClick}
                    name="content"
                    rows={clicked ? "3" : "1"}
                    placeholder="Take a note . . ."
                    value={note.content}
                    spellCheck="false" />



                <Zoom in={clicked ? true : false}>
                    <Fab onClick={handleSubmit}>
                        <AddIcon />
                    </Fab>
                </Zoom>
            </form>
        </div>
    );
}
