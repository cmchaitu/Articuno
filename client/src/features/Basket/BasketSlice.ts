import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../App/api/agent";
import { Basket } from "../../App/Models/Basket";

interface BasketState {
    basket: Basket | null,
    status: string
}
const initialState: BasketState = {
    basket: null,
    status: 'idle'
}

export const addBasketItemAsync = createAsyncThunk<Basket, { productID: number, quantity?: number }>
    ('basket/addBasketItemAsync',
        async ({ productID, quantity = 1 }) => {
            try {
                return await agent.Basket.addItem(productID, quantity);
            } catch (e) {
                console.log(e);
            }
        })

export const removeBasketItemAsync = createAsyncThunk<void, { productID: number, quantity?: number }>
    ('basket/removeBasketItemAsync',
        async ({ productID, quantity = 1 }) => {
            try {
                await agent.Basket.removeItem(productID, quantity);
            } catch (e) {
                console.log(e);
            }
        })
export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasket: (state, action) => { state.basket = action.payload },
    },
    extraReducers: (builder => {
        builder.addCase(addBasketItemAsync.pending, (state, action) => {
            state.status = 'pendingAddingBasketItem' + action.meta.arg.productID
        }); builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
            state.basket = action.payload;
            state.status = 'idle'
        }); builder.addCase(addBasketItemAsync.rejected, (state) => {
            state.status = 'idle'
        });

        builder.addCase(removeBasketItemAsync.pending, (state, action) => {
            state.status = 'pendingRemovingBasketItem' + action.meta.arg.productID
        });

        builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
            const { productID, quantity } = action.meta.arg;
            const itemindex = state.basket?.items.findIndex(i => i.productID === productID);
            if (itemindex === -1 || itemindex === undefined) return;
            state.basket!.items[itemindex].quantity -= quantity!;
            if (state.basket!.items[itemindex].quantity === 0)
                state.basket?.items.splice(itemindex, 1);
            state.status = 'idle'
        });
        builder.addCase(removeBasketItemAsync.rejected, (state) => {
            state.status = 'idle'
        });
    })
})
export const { setBasket } = basketSlice.actions;