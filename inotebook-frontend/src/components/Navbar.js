import React from 'react'
import {
    // BrowserRouter as Router,
    useLocation,
    Link,
    useNavigate
} from "react-router-dom";

export default function Navbar() {
    let location = useLocation();
    let history=useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem('token');
        history("/login");       
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                <div className="navbar-brand">iNoteBook</div>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname}==="/home"? "active":""`} to="/home">Home</Link >
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname}==="/about"? "active":""`} to="/about">About</Link >
                            </li>
                        </ul>
                        {!localStorage.getItem('token') ?<form className="d-flex">
                            <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                            <Link className="btn btn-primary mx-2" to="/signup" role="button">SignUp</Link>
                        </form>  : <div className='btn btn-primary' onClick={handleLogout}>LogOut</div>}
                    </div>
                </div>
            </nav>
        </div>
    )
}
