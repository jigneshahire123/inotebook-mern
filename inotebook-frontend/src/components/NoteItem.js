import NotesContext from '../context1/notes1/NotesContext';
import React, { useContext } from 'react';

function NoteItem(props) {
    const context = useContext(NotesContext);
    const { deleteNote } = context;
    const handleDelete = (e) => {
        e.preventDefault();
        deleteNote(note._id);
    }
    const {note, updateNote}=props;
    return (
        <div className="col md">
            <div className="card my-2" >
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary my-1">{note.tag}</h6>
                    <p className="card-text">{note.description}</p>
                    <i className="bi bi-trash3-fill mx-2" onClick={handleDelete}></i>
                    <i className="bi bi-pencil-square mx-2" onClick={()=>{updateNote(note)}}></i>
                </div>
            </div>
        </div >
    )
}
export default NoteItem