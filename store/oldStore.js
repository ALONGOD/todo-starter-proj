import { todoService } from "../services/todo.service.js"

const { createStore } = Redux


export const INCREMENT = 'INCREMENT'
export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'

export const SET_FILTER_BY = 'SET_FILTER_BY'


export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    counter: 100,
    todos: [],
    filterBy: todoService.getDefaultFilter(),
    isLoading: false,
}

function appReducer(state = initialState, action = {}) {
    switch (action.type) {

        case INCREMENT:
            return { ...state, counter: state.counter + 1 }

        case SET_TODOS:
            return { ...state, todos: action.todos }

        case REMOVE_TODO:
            var todos = state.todos.filter(todo => todo._id !== action.todoId)
            return { ...state, todos }

        case ADD_TODO:
            return { ...state, todos: [...state.todos, action.todo] }

        case UPDATE_TODO:
            var todos = state.todos.map(todo => todo._id === action.todo._id ? action.todo : todo)
            return { ...state, todos }

        case SET_FILTER_BY:
            return { ...state, filterBy: action.filterBy }


        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }



        default:
            return state

    }
}

export const store = createStore(appReducer)