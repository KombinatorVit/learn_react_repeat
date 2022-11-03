import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';

type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}
type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id:string
}

type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
}

type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id:string
    title: string

}
type ActionType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const todolistsReducer = (state: TodolistType[], action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id);
        case 'ADD-TODOLIST':
            let newTodolistId = v1();
            return [...state, {id: newTodolistId, title: action.title, filter: 'all'}];

        case 'CHANGE-TODOLIST-TITLE':
            return [...state.map(t=> t.id=== action.id ? {...t, title: action.title} : t)]
        case 'CHANGE-TODOLIST-FILTER':
            return [...state.map(t => t.id===action.id ? {...t, filter: action.filter}: t)]

        default:
            throw new Error('I don\'t understand this type');
    }
};


export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}

export const ChangeTodolistFilterAC = (todolistId: string, filter:FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter: filter }
}

export const ChangeTodolistTitleAc = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title}
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title}
}
