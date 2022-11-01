import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';
type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Rest API', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false},
    ]);

    let [todolists, setTodolists] = useState<Array<TodolistsType>>(
        [
            {id: v1(), title: 'What to learn', filter: 'all'},
            {id: v1(), title: 'What to buy', filter: 'all'},
        ]
    );

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);
    }

    function addTasks(title: string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks];
        setTasks(newTasks);
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }

        setTasks([...tasks]);
    }




    function changeFilter(value: FilterValuesType, todolistId:string) {
        setTodolists(todolists.map(el => ( el.id === todolistId ?{...el,filter:value} : el)))
    }


    return (
        <div className="App">
            {todolists.map(t => {

                let tasksForTodolist = tasks;

                if (t.filter === 'active') {
                    tasksForTodolist = tasks.filter(t => t.isDone === false);
                }
                if (t.filter === 'completed') {
                    tasksForTodolist = tasks.filter(t => t.isDone === true);
                }
                return (
                    <Todolist key={t.id}
                              id={t.id}
                              title={t.title}
                              tasks={tasksForTodolist}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTasks={addTasks}
                              changeTaskStatus={changeStatus}
                              filter={t.filter}
                    />
                );
            })}
        </div>
    );
}

export default App;
