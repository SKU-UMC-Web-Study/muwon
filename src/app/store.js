import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos/reducer';

const store = configureStore({
  reducer:{
    todos: todosReducer,
  },
});

// const store = configureStore(todoReducer);

export default store;