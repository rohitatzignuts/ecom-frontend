export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity?: number;
}

export interface User {
    id?: number;
    username: string;
    email?: string;
    password: string;
    confirmPassword?: string;
}
