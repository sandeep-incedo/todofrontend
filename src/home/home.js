import { useSelector } from "react-redux";
import { useHistory, Link } from 'react-router-dom';
import './home.css';

export default function HomeComponent (props){
    const credentials = useSelector(state => state.userCredentials);
    const history = useHistory();
    if(!credentials.token)
        history.push('/');
    return (
        <div>
            <Link to="/createTask"><button type='button'>Create New Task</button></Link>
            <Link to="/showTasks"><button type='button'>List All Tasks</button></Link>
        </div>
    )
}