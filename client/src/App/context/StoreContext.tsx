import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Basket } from "../Models/Basket";

interface StoreContextValue {
    basket: Basket | null;
    setBasket: (basket: Basket) => void;
    removeItem: (productid: number, quantity: number) => void;
}
export const storeContext = createContext<StoreContextValue | undefined>(undefined);
//creating custom hook
export function useStoreContext() {
    const context = useContext(storeContext);
    if (context === undefined) {
        throw Error('Not inside provider');
    }
    return context;
}
export function StoreProvider({ children }: PropsWithChildren<any>) {
    const [basket, setBasket] = useState<Basket | null>(null);
    function removeItem(productid: number, quantity: number) {
        if (!basket) return;
        const items = [...basket.items];
        const itemindex = items.findIndex(i => i.productID === productid);
        if (itemindex >= 0) {
            items[itemindex].quantity -= quantity;
            if (items[itemindex].quantity === 0) {
                items.splice(itemindex, 1);
            }
            setBasket(prevState => { return { ...prevState!, items } })
        }
    }
    return <storeContext.Provider value={{ basket, setBasket, removeItem }}>
        {children}

    </storeContext.Provider>
}