import {TasksStateType} from '../App';
import {v1} from 'uuid';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string
    todolistId:string
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId:string

}



type ActionsType = RemoveTaskActionType | AddTaskActionType
export const tasksReducer = (state: TasksStateType  , action: ActionsType) : TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.todolistId]:[{id: v1(), title:action.title, isDone:false}, ...state[action.todolistId]] }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', taskId, todolistId}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return { type: 'ADD-TASK', title, todolistId}
}


