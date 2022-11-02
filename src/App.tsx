import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';
type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TodoTaskType = {
    [key: string]: TaskType[]
}
function App() {

    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: 'HTML&CSS', isDone: true},
    //     {id: v1(), title: 'JS', isDone: true},
    //     {id: v1(), title: 'ReactJS', isDone: false},
    //     {id: v1(), title: 'Rest API', isDone: false},
    //     {id: v1(), title: 'GraphQL', isDone: false},
    // ]);

   let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TodoTaskType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })





    function removeTask(id: string, todolistId: string) {
        // let filteredTasks = tasks.filter(t => t.id != id);
        // setTasks(filteredTasks);


        setTasks({...tasks, [todolistId] : tasks[todolistId].filter( t=> t.id != id)})
    }

    function addTasks(title: string, todolistId: string) {
        // let task = {id: v1(), title: title, isDone: false};
        // let newTasks = [task, ...tasks];
        // setTasks(newTasks);
setTasks({...tasks, [todolistId]: [{id: v1(), title, isDone: false}, ...tasks[todolistId]]})
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId:string) {
        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }
        //
        // setTasks([...tasks]);

        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el=> (
            el.id ===taskId ? {...el, isDone}:el
            ))})
    }




    function changeFilter(value: FilterValuesType, todolistId:string) {
        setTodolists(todolists.map(el => ( el.id === todolistId ?{...el,filter:value} : el)))
    }

    function removeTodolist(todolistId:string){
       setTodolists(todolists.filter(t => t.id !== todolistId))

        delete tasks[todolistId]

        setTasks({...tasks})
    }

    return (
        <div className="App">
            {todolists.map(t => {

                let tasksForTodolist = tasks[t.id];

                if (t.filter === 'active') {
                    tasksForTodolist = tasks[t.id].filter(t => !t.isDone);
                }
                if (t.filter === 'completed') {
                    tasksForTodolist = tasks[t.id].filter(t => t.isDone );
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
                              removeTodolist={removeTodolist}
                    />
                );
            })}
        </div>
    );
}

export default App;
