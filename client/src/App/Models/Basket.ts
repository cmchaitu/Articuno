export interface BasketItem {
    productID: number;
    name: string;
    price: number;
    pictureURL: string;
    type: string;
    brand: string;
    quantity: number;
}

export interface Basket {
    buyerID: string;
    items: BasketItem[];
}