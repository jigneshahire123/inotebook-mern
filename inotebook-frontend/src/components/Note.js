import NotesContext from '../context1/notes1/NotesContext';
import React, { useContext, useRef, useState, useEffect} from 'react';

import { useNavigate } from 'react-router-dom';
import NoteItem from './NoteItem';
import AddNote from "./AddNote";

export default function Note() {
    let history = useNavigate();
    const context = useContext(NotesContext);    
    const { notes, editNote, getAllNotes } = context;
    const ref = useRef(null);
    const closeref = useRef(null);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    const updateNote = (note) => {
        ref.current.click();
        setNote({ id: note._id, etitle: note.title, edescription: note.description, etag: note.tag });
    }
    const handleClick = (e) => {
        e.preventDefault();
        editNote(note.id, note.etitle, note.etag, note.edescription);
        closeref.current.click();

    }
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getAllNotes();
        }
        else {
            history("/login");
        }
    },[]);

    return (
        <>
            <button type="button" hidden ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" style={{backgroundColor:'violet'}}>
                            <form action="">
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Add title</label>
                                    <input type="text" minLength={5} required className="form-control" name="etitle" id="etitle" value={note.etitle} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Add tag</label>
                                    <input type="text" minLength={5} required className="form-control" id="etag" name="etag" value={note.etag} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Add description</label>
                                    <input type="text" minLength={5} required className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={handleChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={closeref} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5 || note.etag < 5 ? true : false} type="button" className="btn btn-primary" onClick={handleClick}>Edit note</button>
                        </div>
                    </div>
                </div>
            </div>

            <AddNote />
            <div className="row my-3">
                <h2 className='my-2'>Your note are below</h2>
                {notes.map((note) => {
                    return (
                        <NoteItem key={note._id} updateNote={updateNote} note={note} />
                    );
                })}
            </div>

        </>
    )
}
