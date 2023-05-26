import { ADD_TODO, DELETE_TODO, EDIT_TODO } from '../actions/actiontypes';

export const addTodo = (newTodo) => {
  return {
    type: ADD_TODO,
    payload: newTodo,
  };
};

export const editTodo = (id, update) => {
  return {
    type: EDIT_TODO,
    payload: {
      id,
      update,
    },
  };
};

export const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    payload: id,
  };
};
  