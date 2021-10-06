import { Link } from 'react-router-dom';

function TaskComponent(props) {
    let category='Not Defined';
    const deadlineDate = new Date(props.task.deadline).setHours(0,0,0,0);
    const currentDate = new Date().setHours(0,0,0,0);
    console.log(deadlineDate, currentDate);
    if(currentDate > deadlineDate)
        category= 'Overdue'
    else if(currentDate === deadlineDate)
        category = 'Todays Task'
    else if(currentDate < deadlineDate)
        category = 'Upcoming'
    return (
        <>
            <td>{props.task.name}</td>
            <td>{props.task.description}</td>
            <td>{props.task.priority}</td>
            <td>{new Date(props.task.deadline).toLocaleDateString()}</td>
            <td>{category}</td>
            <td>{props.task.status ? 'Completed': 'Pending'}</td>
            <td><Link to={`/updateTask/${props.task._id}`}><button>Update</button></Link></td>
            <td><button onClick= {() => props.deleteTask(props.task._id)}>Delete</button></td>
        </>
    );
}
export default TaskComponent;