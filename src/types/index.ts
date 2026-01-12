export interface Product {
    id: number | string;
    title: string;
    img: string;
    price: number;
    rating: number;
    onSale?: boolean;
    brand?: string;
}

export interface Review {
    id: string;
    productId: number | string;
    productName: string;
    productImage: string;
    price: number;
    text: string;
    rating: number;
    date: string;
    user: {
        name: string;
        avatar: string;
    };
}

export interface Address {
    id: string;
    label: string;
    isDefault: boolean;
    recipientName: string;
    phoneNumber: string;
    addressLine1: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
}

export interface OrderItem {
    id?: string;
    name: string;
    image: string;
    qty: number;
    price?: number;
}

export interface Order {
    id: string;
    date: string;
    status: "Delivered" | "In Process" | "Cancelled";
    items: OrderItem[];
    total: number;
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    addresses: Address[];
    orders: Order[];
    reviews: Review[];
    token?: string;
}
