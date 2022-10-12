import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTasks: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState('');

    function addTask() {
        props.addTasks(title);
        setTitle('');
    }

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value);
    }

    function onKeyPressHandler(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            addTask();
        }
    }

    function changeAllFilter() {
        props.changeFilter('all');
    }

    function changeActiveFilter() {
        props.changeFilter('active');
    }

    function changeCompletedFilter() {
        props.changeFilter('completed');
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    function removeTaskHandler() {
                        props.removeTask(t.id);
                    }

                    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
                        props.changeTaskStatus(t.id, e.currentTarget.checked);
                    }

                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                        <span>{t.title}</span>
                        <button onClick={removeTaskHandler}>x
                        </button>
                    </li>;
                })
            }
        </ul>
        <div>
            <button onClick={changeAllFilter}>
                All
            </button>
            <button onClick={changeActiveFilter}>
                Active
            </button>
            <button onClick={changeCompletedFilter}>
                Completed
            </button>
        </div>
    </div>;
}
