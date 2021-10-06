import { useState, useEffect} from 'react';
import axios from 'axios';

import { useSelector } from "react-redux";
import { useHistory, Link } from 'react-router-dom';
import TaskComponent from './task';

import './showTasks.css';

export default function ShowTasksComponent (props){
    const [tasks, setTasks] = useState([]);
    // const [unfilteredTasks, setUnfilteredTasks] = useState([]);
    const [filterdeadline, setFilterDeadline] = useState(0);
    const [filterStatus, setFilterStatus] = useState(0);
    const credentials = useSelector(state => state.userCredentials);
    const headers = {
        'x-access-token': credentials.token
    }
    const history = useHistory();
    const url = process.env.REACT_APP_API_URL;
    useEffect(() => {
        axios.get(url + '/task/getTasks', {headers: headers})
        .then(resp => {
            //console.log(resp.data);
            //resp.data.map(task =>  task.status?1:0);
            setTasks(resp.data);
        })
        .catch(err => {
            alert(err);
        })
    },[]);

    const deleteTask = (id) => {
        axios.delete(url + '/task/deleteTask',{ headers: headers, data:{id: id}})
        .then(resp => {
            history.push('/home');
        })
        .catch(err => {
            alert(err);
        })
    }

    if(!credentials.token)
        history.push('/');

    const handleFilterByDeadline = () => {
        if(filterdeadline === 0) {
        tasks.sort(function(a, b) {
            var keyA = new Date(a.deadline),
              keyB = new Date(b.deadline);
            // Compare the 2 dates
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
          });
          setFilterDeadline(1);
          setTasks(tasks);
          console.log("Tasks", tasks);
        }
        else if(filterdeadline === 1) {
            tasks.sort(function(a, b) {
                var keyA = new Date(a.deadline),
                  keyB = new Date(b.deadline);
                // Compare the 2 dates
                if (keyA > keyB) return -1;
                if (keyA < keyB) return 1;
                return 0;
              });
              setFilterDeadline(0);
              setTasks(tasks);
              console.log("Tasks", tasks);
        }
    } 

    const handleFilterByStatus = () => {
        if(filterStatus === 0) {
            tasks.sort((a, b) => {
                if (a.status > b.status) return -1;
                if (a.status < b.status) return 1;
                return 0;
                
            });
            setTasks(tasks);
            setFilterStatus(1);
        }

        else if(filterStatus === 1) {
            tasks.sort((a, b) => {
                if (a.status < b.status) return -1;
                if (a.status > b.status) return 1;
                return 0;
                
            });
            setTasks(tasks);
            setFilterStatus(0);
        }
        console.log("Tasks", tasks);
    }

    // const handleFilterClear = () => {
    //     setTasks(unfilteredTasks);
    // }

    return (
        <div>
            <h4><b>TaskList</b></h4><hr/><hr/><br/><br/>
            <Link to="/home"><button type='button'>Goto Home Page</button></Link><hr/>
            <br/>
            <br/>
            <hr/>
            <div>Filters</div><br/>
            <button onClick={handleFilterByDeadline}>By Deadline: {filterdeadline?'DESC':'ASC'}</button>
            <button onClick={handleFilterByStatus}>By Status</button>
            {/* <button onClick={handleFilterClear}>Clear filter</button> */}
            <hr/>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Priority</th>
                    <th>Deadline</th>
                    <th>Category</th>
                    <th>Status</th>
                </tr>
                {
                tasks.map((task, i) => 
                    <tr key={i}><TaskComponent task={task} deleteTask={deleteTask}/></tr>
                )
                }
            </table>
            
        </div>
    )
}