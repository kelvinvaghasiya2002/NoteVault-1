import Zoom from '@mui/material/Zoom';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { useState } from 'react';
import "./compose.css"


export default function Compose() {
    const [clicked, setClicked] = useState(false)
    const [note, setNote] = useState({
        title : "",
        content : ""
    })

    function handleClick() {
        setClicked(true);
    }

    function handleChange(event) {
        const {name : name , value : value} = event.target;
        setNote((prevValue)=>{
            return {
                ...prevValue,
                [name] : value
            }
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        setNote({
            title : "",
            content : ""
        })
    }

    return (
        <div>
            <form className="create-note">
                {
                    clicked &&
                    <input
                        onChange={handleChange}
                        name="title"
                        placeholder="Title"
                        value={note.title}
                        spellCheck = "false" />
                }

                {clicked && <br />}


                <textarea
                    onChange={handleChange}
                    onClick={handleClick}
                    name="content"
                    rows={clicked ? "3" : "1"}
                    placeholder="Take a note . . ."
                    value={note.content}
                    spellCheck = "false" />



                <Zoom in={clicked ? true : false}>
                    <Fab onClick={handleSubmit}>
                        <AddIcon />
                    </Fab>
                </Zoom>
            </form>
        </div>
    );
}