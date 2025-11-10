
import NotesContext from '../context1/notes1/NotesContext';
import React, { useContext, useState } from 'react'; 

function AddNote() {
    const context = useContext(NotesContext); 
    const { addNote } = context;

    const [note, setNote] = useState({title:"",description:"",tag:""});

    const handleChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value});
    }
    
    const handleClick=(e)=>{
       e.preventDefault(); 
       addNote(note);
       setNote({title:"",description:"",tag:""});
    }

    return (
        <div className='container my-2' >
            <h2>Add a note</h2>
            <form action="">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Add title</label>
                    <input type9="text"  className="form-control" minLength={5} required name="title" id="title"  value={note.title} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Add tag</label>
                    <input type="text" className="form-control" id="tag" minLength={5} required name="tag"  value={note.tag} onChange={handleChange}  />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Add description</label>
                    <input type="text" className="form-control" id="description" minLength={5} required name="description"  value={note.description} onChange={handleChange}   />
                </div>

                <button type="submit" disabled={note.title.length<5 ||note.description.length<5 || note.tag<5 ? true :false} className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
        </div>
    )
}

export default AddNote;