import React, { useState } from "react"
import NoteContext from "./NotesContext.js";

const url = "http://localhost:5000/api/notes";
const NoteState = (props) => {

    const initialNotes = [
    ]

    const [notes, setNotes] = useState(initialNotes);


    const getAllNotes = async () => {
        const response = await fetch(url + "/fetchAllNotes", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const result = await response.json();
        setNotes(result);

    }

    // document.querySelector("j1")
    const addNote = async ({ title, description, tag }) => {

        const response = await fetch(url + "/addNote", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ "title": title, "description": description, "tag": tag })
        });

        let result = await response.json();
        setNotes(notes.concat(result));

    }

    const deleteNote = async (id) => {
        // console.log(id);
        const final = url + "/deleteNote/" + id;
        const response = await fetch(final, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        // eslint-disable-next-line
        const result = await response.json();
        // console.log(result);
        setNotes(notes.filter((n) => { return n._id !== id }));

    }

    const editNote = async (id, title, description, tag) => {

        const response = await fetch(url + `/updateNote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ tag, description, title })
        });
        // eslint-disable-next-line
        const result = await response.json();

        let newNote=JSON.parse(JSON.stringify({notes}));

        for (let index = 0; index < newNote.length; index++) {
            const element = newNote[index];
            if (element._id === id) {
                element.description = description;
                element.tag = tag;
                element.title = title;
            }
        }
    }
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote ,getAllNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
