import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProds,addProd,deleteProd,updateProd ,  } from './prodAPI';

const initialState = {
  total: 0,
  status: 'idle',
  prods:[]
};

export const getProdsAsync = createAsyncThunk(
  'prod/getProds',
  async () => {
    // console.log(formData);
    const response = await getProds();
    
    return response.data;
  }
);
export const addProdAsync = createAsyncThunk(
    'prod/addProd',
    async (prod) => {
      const response = await addProd(prod);
      return response.data;
    }
  );

export const updateProdAsync = createAsyncThunk(
    'prod/updateProd',
    async (prod) => {
      const response = await updateProd(prod);
      return response.data;
    }
  );

export const deleteProdAsync = createAsyncThunk(
    'prod/deleteProd',
    async (prod) => {
      const response = await deleteProd(prod);
      return response.data;
    }
  );
export const prodSlice = createSlice({
  name: 'prod',
  initialState,
  reducers: {
    increment: (state) => {
    //   state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProdsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProdsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // console.log(action.payload);
        state.prods = action.payload;
      }).addCase(addProdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // console.log(action.payload);
        state.prods.push( action.payload);
      })
      .addCase(updateProdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // console.log(action.payload);
        state.prods = state.prods.map(prod => prod.id === action.payload.id ? action.payload : prod);
      })
      .addCase(deleteProdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // console.log(action.payload);
        state.prods = state.prods.filter(prod => prod.id !== action.payload.id);
      });
  },
});

export const { increment} = prodSlice.actions;
export const selectProds = (state) => state.prod.prods;
export default prodSlice.reducer;