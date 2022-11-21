import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../App/api/agent";
import { Product } from "../../App/Models/Product";
import { RootState } from "../../App/store/configureStore";

const productsadapter = createEntityAdapter<Product>();

export const fetchProductsAsync = createAsyncThunk<Product[]>(
    'catalog/fetchProductsAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.catalog.list();
        } catch (e: any) {
            return thunkAPI.rejectWithValue({ e: e.data });
        }
    })
export const fetchProductAsync = createAsyncThunk<Product, string>(
    'catalog/fetchProductAsync',
    async (productID, thunkAPI) => {
        try {
            return await agent.catalog.details(productID);
        } catch (e: any) {
            return thunkAPI.rejectWithValue({ e: e.data });
        }
    })
export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productsadapter.getInitialState({
        productsloaded: false,
        status: 'idle'
    }),
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = 'pendingFetchProducts';
        });
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productsadapter.setAll(state, action.payload);
            state.status = 'idle';
            state.productsloaded = true;
        });
        builder.addCase(fetchProductsAsync.rejected, (state) => {
            state.status = 'idle';
        });

        builder.addCase(fetchProductAsync.pending, (state) => {
            state.status = 'pendingFetchProduct';
        });
        builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
            productsadapter.upsertOne(state, action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchProductAsync.rejected, (state, action) => {
            console.log(action);
            state.status = 'idle';
        });
    }
    )
})
export const productselectors = productsadapter.getSelectors((state: RootState) => state.catalog);