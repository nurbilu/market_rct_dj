import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addTask ,fetchTasks, deleteTask , updateTask   } from './taskAPI';

const initialState = {
    value: 0,
    status: 'idle',
};

export const addTaskAsync = createAsyncThunk(
    'task/addTask',
    async (formData) => {
        // console.log(formData);
        const response = await addTask(formData);
        return response.data;
    }
);
export const fetchTasksAsync = createAsyncThunk(
    'tasks/fetchTasks',
    async () => {
      const response = await fetchTasks(); // Assuming showTask correctly fetches tasks and images
      return response.data;
    }
  );

  export const deleteTaskAsync = createAsyncThunk(
    'task/deleteTask',
    async (id) => {
      
      const response = await deleteTask(id);
      return response;
    }
  );
  
  export const updateTaskAsync = createAsyncThunk(
    'task/updateTask',
    async ({ id, ...data }, thunkAPI) => {
      const response = await updateTask(id, data);
      return response;
    }
  )

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addTaskAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value += action.payload;
            })

            .addCase(fetchTasksAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = action.payload;
            })
            .addCase(deleteTaskAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = action.payload;
            })
            .addCase(updateTaskAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = action.payload;
            });
    },
});

export const { increment } = taskSlice.actions;
export const selectCount = (state) => state.task.value;
export default taskSlice.reducer;