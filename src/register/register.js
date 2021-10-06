import {useState} from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';

function RegisterComponent(props){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const credentials = useSelector(state => state.userCredentials);
    const url = process.env.REACT_APP_API_URL;
    const history = useHistory();   
    

    const registerUser = (evt) => {
        evt.preventDefault();
        const payload = {
            first_name:firstName,
            last_name:lastName,
            email: email,
            password:password
        }
        axios.post(url + '/register', payload)
        .then(response => {
            history.push('/home');
        })
        .catch(err => {
            console.log(err);
        })
    }

    if(credentials.token)
        history.push('/home');
    return(
        <form onSubmit={registerUser}>
                <label>FirstName:
                 <input type='text' value={firstName} onChange={e => setFirstName(e.target.value)} placeholder='Sandeep' required/>
                </label>
                <br/>
                <label>LastName:
                    <input type='text' value={lastName} onChange={e => setLastName(e.target.value)} placeholder='Yadav' required/>
                </label>
                <br/>
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
    );
}

export default RegisterComponent;