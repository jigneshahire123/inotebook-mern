
import React, { useContext } from 'react';
import NoteContext from '../context1/notes1/NotesContext';
export default function Home() {
    const context=useContext(NoteContext);
    const {notes,setNote}=context;
    
    return (

        <div className='my-2'>
            <h1>Add a note</h1>
            <form action="">
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Add title</label>
                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Enter a title for note" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Add tag</label>
                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Enter tag to your note" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Add description</label>
                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Enter note description" />
                </div>


            </form>
            <h4>Your note is //. below</h4>
            {notes.map((note)=>{
                return <div> {note.title}</div>;
            })}
            
        </div>  
    )
}
