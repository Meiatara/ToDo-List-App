import { ADD_TODO, DELETE_TODO, EDIT_TODO } from '../actions/actiontypes';

const initialState = {
  DataTodo: [
      { id: 1, task: "Buy Milk", status: false },
      { id: 2, task: "Buy Egg", status: true },
      { id: 3, task: "Buy T-Shirt", status: false },
  ],
};

const OperationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state, DataTodo: [...state.DataTodo, action.payload],
      };
    case DELETE_TODO:
      return {
        ...state, DataTodo: state.DataTodo.filter((todo) => todo.id !== action.payload),
      };
    case EDIT_TODO:
      const { id, update } = action.payload;
      return {
        ...state, DataTodo: state.DataTodo.map((todo) => todo.id === id ? { ...todo, ...update } : todo
        ),
      };
    default:
      return state;
  }
};

export default OperationsReducer;