import { useRef, useState, useEffect } from 'react'
import './Pass.css'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useUserInfo } from '../../contexts/Login';

export default function Note({ title, content, userId, noteId}) {
    const url = "http://localhost:4000";
    const [popNote, setpopNote] = useState(false);
    console.log(popNote);
    const [note, setNote] = useState({
        title: title,
        content: content
    })
    const { user, setUser, isLogged, setLogged } = useUserInfo();

    const popRef = useRef();

    function handleChange(event) {
        const { name, value } = event.target;
        setNote((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    function handleClick(e) {
        setpopNote(!popNote)
        console.log(popRef.current);
        document.querySelectorAll(".note").forEach((item) => {
            item.style.filter = "brightness(20%)";
        })
    }

    async function handleSave(event) {
        event.preventDefault();
        try {
            const response = await axios.patch(url + `/edit-pass?userid=${userId}&noteid=${noteId}&title=${note.title}&content=${note.content}`);
            console.log(response.data.result);
            setUser(response.data.result)

        } catch (err) {
            console.log(err);
        }    
        setpopNote(false);
        document.querySelectorAll(".note").forEach((item) => {
            item.style.filter = "brightness(100%)";
        })
    }

    async function handleDelete(event) {
        event.preventDefault()
        try {
            const response = await axios.delete(url + `/pass-delete?userid=${userId}&noteid=${noteId}`);
            console.log(response.data.result);
            setUser(response.data.result)
        } catch (err) {
            console.log(err);
        }
        setpopNote(false);
        document.querySelectorAll(".note").forEach((item) => {
            item.style.filter = "brightness(100%)";
        })
    }



    useEffect(() => {
        let handler = (e) => {
            if (!popRef.current.contains(e.target)) {
                setpopNote(false)
                document.querySelectorAll(".note").forEach((item) => {
                    item.style.filter = "brightness(100%)";
                })
            } 
            else {
                if(popNote){
                    document.querySelectorAll(".note").forEach((item) => {
                        item.style.filter = "brightness(20%)";
                    })
                }
            }
        }
        document.addEventListener("mousedown", handler)

        return () => {
            document.removeEventListener("mousedown", handler)
        }
    })




    return (
        <>

            <div ref={popRef}  className={`note-pop-up ${ popNote ? 'active' : 'inactive'}`} >
                <form className="compose-form">
                    <input
                        className="createArea"
                        name="title" value={note.title}
                        onChange={handleChange}
                        placeholder="Title"
                        spellCheck="false"
                    />

                    <textarea
                        className="createArea"
                        name="content"
                        value={note.content}
                        onChange={handleChange}
                        placeholder="Write a note ..."
                        spellCheck="false"
                        rows={3}
                    ></textarea>

                    <div className="buttons">
                        <button onClick={handleSave}>Save</button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>

                </form>
            </div>



            {
                !popNote &&
                <div style={{cursor:'pointer'}} onClick={handleClick} className='note'>
                    <h1>{title}</h1>
                    <p>{content}</p>
                </div>
            }


        </>
    )
}