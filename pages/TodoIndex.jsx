import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { loadTodos, removeTodo, saveTodo } from "../store/actions/todo.actions.js"
import { SET_FILTER_BY } from "../store/reducers/todo.reducer.js"

const { useSelector, useDispatch } = ReactRedux
const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

export function TodoIndex() {
    const dispatch = useDispatch()
    const todos = useSelector(state => state.todoModule.todos)
    const isLoading = useSelector(state => state.todoModule.isLoading)

    // Special hook for accessing search-params:
    const [searchParams, setSearchParams] = useSearchParams()

    const defaultFilter = todoService.getFilterFromSearchParams(searchParams)

    // const [filterBy, setFilterBy] = useState(defaultFilter)
    const filterBy = useSelector(state => state.todoModule.filterBy)


    useEffect(() => {
        dispatch({ type: SET_FILTER_BY, filterBy: defaultFilter })
    }
        , [])


    useEffect(() => {
        setSearchParams(filterBy)
        loadTodos(filterBy)
            .catch(err => { showErrorMsg('Cannot load todos') })
    }, [filterBy])

    function setFilterBy(filterBy) {
        dispatch({ type: SET_FILTER_BY, filterBy })

    }


    function onRemoveTodo(todoId) {
        if (confirm('Are you sure you want to remove this todo?')) {
            removeTodo(todoId)
                .then(() => { showSuccessMsg(`Todo removed`) })
                .catch(err => { showErrorMsg('Cannot remove todo ' + todoId) });
        }
    }

    function onToggleTodo(todo) {
        const todoToSave = { ...todo, isDone: !todo.isDone }
        saveTodo(todoToSave)
            .then(savedTodo => { showSuccessMsg(`Todo is ${(savedTodo.isDone) ? 'done' : 'back on your list'}`) })
            .catch(err => showErrorMsg('Cannot toggle todo ')
            )
    }

    // if (!isLoading) return <div>Loading...</div>
    return (
        <section className="todo-index">
            <TodoFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />
            <div>
                <Link to="/todo/edit" className="btn" >Add Todo</Link>
            </div>
            <h2>Todos List</h2>
            {isLoading ? <div>Loading...</div> : <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo} />}
            <hr />
            <h2>Todos Table</h2>
            <div style={{ width: '60%', margin: 'auto' }}>
                <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
            </div>
        </section>
    )
}