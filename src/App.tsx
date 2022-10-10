import React, {useState} from 'react';
import './App.css';
import {TasksPropsType, Todolist} from './Todolist';


export type FilteredType = 'all' | 'active' | 'completed'


function App() {

   const[tasks, setTasks]=useState<Array<TasksPropsType>>([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "Redux", isDone: false },
        { id: 5, title: "GraphQL", isDone: false }
    ])

    const[filter, setFilter] = useState<FilteredType>('all')

    function removeTask(id:number){
 setTasks( tasks.filter(t => t.id !== id))
    }

    function changeFilter(value:FilteredType) {
        setFilter(value)
    }

    let filteredTasks = tasks
if(filter === 'active'){
    filteredTasks = tasks.filter(t => !t.isDone)
}
    if(filter === 'completed'){
        filteredTasks = tasks.filter(t => t.isDone)
    }
    return (
        <div className="App">
            <Todolist title="What to learn" tasks={filteredTasks} removeTask={removeTask} changeFilter={changeFilter}/>
        </div>
    );
}

export default App;

