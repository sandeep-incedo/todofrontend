import {Switch, Route} from 'react-router-dom';
import LoginComponent from '../login/login';
import HomeComponent from '../home/home';
import CreateTaskComponent from '../tasks/createTask';
import ShowTasksComponent from '../tasks/showtasks';
import UpdateTaskComponent from '../tasks/updateTask';
import RegisterComponent from '../register/register';

export default function AllRoutes(props) {
return (
<Switch>
    <Route exact path='/' component={LoginComponent}></Route>
    <Route exact path='/register' component={RegisterComponent}></Route>
    <Route exact path='/home' component={HomeComponent}></Route>
    <Route exact path='/createTask' component={CreateTaskComponent}></Route>
    <Route exact path='/showTasks' component={ShowTasksComponent}></Route>
    <Route exact path='/updateTask/:id' render={(props) => <UpdateTaskComponent {...props}/>}></Route>
</Switch>
);
}