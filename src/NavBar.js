import  {React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = (props) => {
    const navigate = useNavigate;
    const [searchTerm, setSearchTerm] = useState('');

    let manage;
    if(props.manageLoggedIn) {
        manage = <li className="nav-item"><Link className="nav-link active" to={"/manage"}>Manage</Link></li>
    } else {
        manage = null;
    }
    const powerSearch = () => {
        navigate('/shop'+this.searchTerm);
    }

    const updateSearchTerm = (event) => {
        setSearchTerm(event.target.value);
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
        <a className="navbar-brand" href="/">St. Peter's Table</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <Link className="nav-link active" to="/about">About</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" to="/shop">Shop</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" to="/login">Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" to="/register">Register</Link>
            </li>
            {manage}
            </ul>
            <form className="d-flex" onSubmit={powerSearch}>
                <input className="form-control me-2" type="search" placeholder="Search Shop" aria-label="Search" name="search" value={searchTerm}  onChange={updateSearchTerm}/>
                <button className="btn btn-outline-success">Search</button>
            </form>
        </div>
        </div>
        </nav>
    );
}

export default NavBar;