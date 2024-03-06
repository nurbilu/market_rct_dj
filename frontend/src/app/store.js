import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import taskReducer from '../features/counter/taskSlice';
import loginReducer from '../features/counter/loginSlice';
import prodReducer  from '../features/products/prodSlice';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    task: taskReducer,
    login: loginReducer,
    prod : prodReducer ,

  },
});
