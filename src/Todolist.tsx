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
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    function addTask() {
        if (title.trim() !== '') {
            props.addTasks(title.trim());
            setTitle('');
        } else {
            setError('Title is required');
        }
    }

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value);
    }

    function onKeyPressHandler(e: KeyboardEvent<HTMLInputElement>) {
        setError(null)
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
                   className={error ? 'error' : ''}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={'error-message'}>{error}</div> }
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

                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                        <span>{t.title}</span>
                        <button onClick={removeTaskHandler}>x
                        </button>
                    </li>;
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={changeAllFilter}>
                All
            </button>
            <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={changeActiveFilter}>
                Active
            </button>
            <button  className={props.filter === 'completed' ? 'active-filter' : ''} onClick={changeCompletedFilter}>
                Completed

            </button>
        </div>
    </div>;
}


