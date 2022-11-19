import { createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../App/Models/Basket";

interface BasketState {
    basket: Basket | null
}
const initialState: BasketState = {
    basket: null
}
export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasket: (state, action) => { state.basket = action.payload },
        removeItem: (state, action) => {
            const { productid, quantity } = action.payload;
            const itemindex = state.basket?.items.findIndex(i => i.productID === productid);
            if (itemindex === -1 || itemindex === undefined) return;
            state.basket!.items[itemindex].quantity -= quantity;
            if (state.basket!.items[itemindex].quantity === 0)
                state.basket?.items.splice(itemindex, 1);
        }
    }
})
export const { setBasket, removeItem } = basketSlice.actions;