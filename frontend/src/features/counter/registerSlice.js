import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { register } from './registerAPI';

const initialState = {
    status: 'idle',
    error: null,
};

// Async thunk for registration
export const registerAsync = createAsyncThunk(
    'register/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            // Axios returns a response object where the actual data is in the `data` property
            const response = await register(userData);
            // Assuming the API response's relevant data is directly in the `data` property
            return response.data;
        } catch (error) {
            // Axios wraps errors in an `error.response` object
            // `error.message` can be used for generic errors not related to the Axios response
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(registerAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // You might want to update the state with user information or clear the error
                state.error = null;
            })
            .addCase(registerAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { } = registerSlice.actions;

export const selectRegistrationStatus = (state) => state.register.status;
export const selectRegistrationError = (state) => state.register.error;

export default registerSlice.reducer;
