import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../features/counter/taskSlice';
import loginReducer from '../features/login/loginSlice';
import prodReducer  from '../features/products/prodSlice';


export const store = configureStore({
  reducer: {
    task: taskReducer,
    login: loginReducer,
    prod : prodReducer ,

  },
});
