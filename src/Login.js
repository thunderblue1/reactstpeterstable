import React, { useState } from 'react';
import './Login.css';
import dataSource from './dataSource';

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const updateUsername = (event) => {
        setUsername(event.target.value);
    }

    const updatePassword = (event) => {
        setPassword(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        checkUser();
    }
    const checkUser = async() => {
        
        const response = await dataSource.get('/users/search/'+username);
        let gotten = response.data;
        console.log("username: "+gotten[0].username);
        console.log("relation: "+gotten[0].relation);

        if(gotten.length>0) {
            for(let i=0;i<gotten.length;i++) {
                if (gotten[i].password===password&&gotten[i].relation==="manager") {
                    props.updateManage(true);
                }
            }
        } else {
            props.updateManage(false);
        }
    };
    return (
        <div className='login'>
            <div className="head mt-4 mb-4">
                <h1 style={{textAlign: "center"}}>Login</h1>
                </div>
                <div className="container box-display box-arrive rounded">
                <div className="row">
                    <form>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input id="username" type="text" className="form-control" aria-describedby="username" placeholder="Username" required value={username} onChange={updateUsername} name="username" />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="password">Password</label>
                            <input id="password" type="text" className="form-control" aria-describedby="password" placeholder="Password" required value={password} onChange={updatePassword} name="password" />
                        </div>
                        <button className="btn btn-primary mt-4 w-100" onClick={onSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;