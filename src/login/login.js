import {useState} from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { actionCreators } from '../actions/index';
import { bindActionCreators } from 'redux';
import { useHistory, Link } from 'react-router-dom';

export default function LoginComponent(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const credentials = useSelector(state => state.userCredentials);
    const url = process.env.REACT_APP_API_URL;
    const dispatch = useDispatch();
    const history = useHistory();
    const {addCredentials} = bindActionCreators(actionCreators, dispatch);    
    const payload = {
        email: email,
        password:password
    }

    const verifyCredentials = (evt) => {
        evt.preventDefault();
        axios.post(url + '/login', payload)
        .then(response => {
            addCredentials(response.data);
            history.push('/home');
        })
        .catch(err => {
            console.log(err);
        })
    }

    if(credentials.token)
        history.push('/home');

    return (
        <div>
            <h1>Login</h1><hr/>
            <h4>or <Link to="/register"><button>Register</button></Link></h4><hr/><br/>
            <form onSubmit={verifyCredentials}>
                <label>Email:
                <input type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='someone@gmail.com' required/>
                </label>
                <br/>
                <label>Password:
                <input type='password' value={password} onChange={e => setPassword(e.target.value)}  placeholder='*******' required/>
                </label>
                <br/>
                <input type='Submit'/>
            </form>
            
        </div>
    );
};
