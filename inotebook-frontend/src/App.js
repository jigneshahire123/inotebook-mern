import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router, Routes,
  Route
} from "react-router-dom";
 
import NoteState from "./context1/notes1/NoteState";
import Alert from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  return (
    <>
      <NoteState> 
        <Router>
          <Navbar />
          <Alert msg="Please check the notes below for user !!!"/>
          <div className="container">
            <Routes>
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<SignUp />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
