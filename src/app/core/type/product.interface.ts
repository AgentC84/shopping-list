
import { Timestamp } from 'firebase/firestore';

export interface ProductInterface {
    id: string,
    name: string,
    //quantity: string,
    amount: number,
    purchased: boolean
    category: string,
    createdAt:Timestamp
}

export interface ShoppingListInterface {
    id:string;
    createdAt: Timestamp,
    name: string,
    updatedAt: Timestamp,
    userOwner: string,
    products: ProductInterface[];
    sharedWith?: ProductInterface[]
}

export interface CategoryInterface {
    id: string,
    name: string,
    code: string
}

export enum Category {
    others = 'Без категории',
    fruits = 'Фрукты',
    vegetables = 'Овощи',
    meat = 'Мясо, птица и рыба',
    milk = 'Молочные продукты',
    bread = 'Хлеб',
    drinks = 'Напитки',
    sweet = 'Сладкое',
    cereals = 'Крупы',
    chemicals = 'Бытовая химия',
  }