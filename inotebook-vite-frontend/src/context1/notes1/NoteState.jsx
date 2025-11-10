import React, { useState } from "react"
import NoteContext from "./NotesContext.js"; 
const NoteState = (props) => { 
    const initialNotes = [
        {
            "_id": "662416ce8a145d54ff27f705",
            "user": "6623c7de3bbbd4103043b5aa",
            "title": "jignesh",
            "description": "Write a note",
            "tag": "First note",
            "date": "2024-04-20T19:26:06.918Z",
            "__v": 0
        },
        {
            "_id": "6626a6d77a3f482cc996fc52",
            "user": "6623c7de3bbbd4103043b5aa",
            "title": "jignesh",
            "description": "Write a note",
            "tag": "First note",
            "date": "2024-04-22T18:05:11.778Z",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(initialNotes);

    return (
        <NoteContext.Provider value={{notes,setNotes}}>
           {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
