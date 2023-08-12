import React, { useState } from 'react';
import './Register.css';
import dataSource from './dataSource';
import { useNavigate } from 'react-router-dom';

const Register = (props) => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [firstname,setFirstname] = useState('');
    const [lastname,setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [thestate, setTheState] = useState('');
    const [zip, setZip] = useState('');
    const [profilePhoto, setProfilePhoto] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();
        registerUser();
    }

    const registerUser = async() => {
        const user = {
            username: username,
            firstName: firstname,
            lastName: lastname,
            password: password,
            street: street,
            city: city,
            country: country,
            state: thestate,
            zip: zip,
            profilePhoto: profilePhoto
        }
        const response = await dataSource.post('/users',user);
        if(response.status===200) {
            alert("The post of the user data was a success, status: "+response.status);
        } else {
            alert("The post of the user data was a failure, status: "+response.status);
        }
        navigate("/login");
    }

    const updateUsername = (event) => {
        setUsername(event.target.value);
    };

    const updateFirstname = (event) => {
        setFirstname(event.target.value);
    };

    const updateLastname = (event) => {
        setLastname(event.target.value);
    };

    const updatePassword = (event) => {
        setPassword(event.target.value);
    };

    const updateStreet = (event) => {
        setStreet(event.target.value);
    };

    const updateCity = (event) => {
        setCity(event.target.value);
    };

    const updateCountry = (event) => {
        setCountry(event.target.value);
    };

    const updateTheState = (event) => {
        setTheState(event.target.value);
    };

    const updateZip = (event) => {
        setZip(event.target.value);
    };

    const updateProfilePhoto = (event) => {
        setProfilePhoto(event.target.value);
    };

    return (
        <div className='register'>
            <div className="head mt-4 mb-4">
            <h1 style={{textAlign: "center"}}>User Registration</h1>
            </div>
            <div className="container box-display box-arrive rounded mt-3">
            <form>
                <div className="form-group">
                <label htmlFor="username">Username</label>
                <input id="username" type="text" className="form-control" aria-describedby="username" placeholder="Username" required value={username} onChange={updateUsername} name="username" />
                </div>
                <div className="form-group mt-2">
                <label htmlFor="password">Password</label>
                <input id="password" type="text" className="form-control" aria-describedby="password" placeholder="Password" required value={password} onChange={updatePassword} name="password" />
                </div>
                <div className="form-group mt-2">
                <label htmlFor="firstname">First Name</label>
                <input id="firstname" type="text" className="form-control" aria-describedby="firstname" placeholder="First Name" required value={firstname} onChange={updateFirstname} name="firstname" />
                </div>
                <div className="form-group mt-2">
                <label htmlFor="lastname">Last Name</label>
                <input id="lastname" type="text" className="form-control" aria-describedby="lastname" placeholder="Last Name" required value={lastname} onChange={updateLastname} name="lastname" />
                </div>
                <div className="form-group mt-2">
                <label htmlFor="street">Street</label>
                <input id="street" type="text" className="form-control" aria-describedby="street" placeholder="Street" required value={street} onChange={updateStreet} name="street" />
                </div>
                <div className="form-group mt-2">
                <label htmlFor="city">City</label>
                <input id="city" type="text" className="form-control" aria-describedby="city" placeholder="City" required value={city} onChange={updateCity} name="city" />
                </div>
                <div className="form-group mt-2">
                <label htmlFor="country">Country</label>
                <input id="country" type="text" className="form-control" aria-describedby="country" placeholder="Country" required value={country} onChange={updateCountry} name="country" />
                </div>
                <div className="form-group mt-2">
                <label htmlFor="state">State</label>
                <input id="state" type="text" className="form-control" aria-describedby="state" placeholder="State" required value={thestate} onChange={updateTheState} name="state" />
                </div>
                <div className="form-group mt-2">
                <label htmlFor="zip">Zip</label>
                <input id="zip" type="text" className="form-control" aria-describedby="zip" placeholder="Zip" required value={zip} onChange={updateZip} name="zip" />
                </div>
                <div className="form-group mt-2">
                <label htmlFor="profilephoto">Profile Photo</label>
                <input id="profilephoto" type="text" className="form-control" aria-describedby="" placeholder="Profile Photo" required value={profilePhoto} onChange={updateProfilePhoto} name="profilephoto" />
                </div>
                <button type="submit" className="btn btn-primary mt-4 w-100" onClick={onSubmit}>Submit</button>
            </form>
            </div>
        </div>
    );
}

export default Register;