const { createStore } = Redux

export const INCREMENT = 'INCREMENT'
const initialState = {
    counter: 100,
    todos: []
}

function appReducer(state = initialState, action = {}) {
    switch (action.type) {

        case INCREMENT:
            return { ...state, counter: state.counter + 1 }
        default:
            return state

    }
}

export const store = createStore(appReducer)