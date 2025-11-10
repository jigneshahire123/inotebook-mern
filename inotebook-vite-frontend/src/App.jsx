import { useContext, useState } from 'react';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar'; 
import NoteState from "./context1/notes1/NoteState";
import {
  BrowserRouter as Router, Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <>
      {/* <NoteContext.Provider value={{notes,setNotes}}> */}
      <NoteState>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
        {/* </NoteContext.Provider> */}
      </NoteState>
    </>
  )
}

export default App
