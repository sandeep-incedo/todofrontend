import { useState, useEffect} from 'react';
import axios from 'axios';

import { useSelector } from "react-redux";
import { useHistory, useParams, Link } from 'react-router-dom';
//import TaskComponent from '../tasks/task';

function UpdateTaskComponent(props) {
    const { id } = useParams();
    console.log(id);
    const [name, setName] =useState("");
    const [description, setDescription] =useState("");
    const [deadline, setDeadline] =useState(Date);
    const [priority, setPriority] =useState("High");
    const [status, setStatus] =useState("Pending");
    const credentials = useSelector(state => state.userCredentials);
    const headers = {
        'x-access-token': credentials.token
    }
    const history = useHistory();
    const url = process.env.REACT_APP_API_URL;
    useEffect(() => {
        axios.get(url + `/task/getTask/${id}`, { headers: headers})
        .then(resp => {
            const task = resp.data;
            setName(task.name);
            setDescription(task.description);
            setDeadline(task.deadline);
            setPriority(task.priority);
            setStatus(task.status);
//            setTasks(resp.data);
        })
        .catch(err => {
            alert(err);
        })
    },[]);

    const callUpdateTask = (event) => {
        event.preventDefault();
        
        const data = {
            "id": id,
            "name":name,
            "description":description,
            "deadline":Date(deadline),
            "priority":priority,
            "status":status == "Completed" ? 1: 0,
            "bucket":""
        }
        console.log(data, headers);
        axios.put(url + '/task/updateTask', data, {headers: headers})
        .then(resp => {
            history.push('/home');
        })
        .catch(err => {
            alert(err);
        })
    };

    if(!credentials.token)
        history.push('/');

    const handlePriorityChange = (event) => {
        event.preventDefault();
        setPriority(event.target.value)
    }

    const handleStatusChange = (event) => {
        event.preventDefault();
        setStatus(event.target.value)
    }
    return (
        <div>
            <Link to="/home"><button type='button'>Goto Home Page</button></Link><hr/><br/><br/>
            <h4>Update Task</h4>
            <form onSubmit={callUpdateTask}>
            <label>Name:
                <input
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                />
            </label><br/>
            <label>Description:
                <input
                type="text" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                />
            </label><br/>
            <label>Deadline:
                <input
                type="date" 
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
                />
            </label><br/>
            <label>Priority:
            <select value={priority} onChange={handlePriorityChange}>
                <option value="High" selected>High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
            </label><br/>
            <label>Status:
            <select value={status} onChange={handleStatusChange}>
                <option value="Pending" selected>Pending</option>
                <option value="Completed">Completed</option>
            </select>
            </label><br/><br/>
            <button type="Submit">Update</button>
            </form> 
        </div>
    )
}

export default UpdateTaskComponent;