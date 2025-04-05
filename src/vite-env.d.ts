/// <reference types="vite/client" />\

interface UserRegister{
    firstname:string,
    lastname:string,
    username:string,
    email:string,
    password:string
}

interface UserLogin{
    email:string,
    password:string
}

interface RegisterResponse {
    message: string;
    user: userRegister;
}


interface User {
    _id: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    createdAt: string;  // ISO date string
    updatedAt: string;  // ISO date string
}


interface UserState {
    success: boolean;
    user: User|undefined;
    loading: boolean;
}


interface StampForm {
  name: string;
  description: string;
  price: number;
  stock: number;
  images: File[];
}