import { Component, inject, OnInit } from '@angular/core';
import { ProductInterface, ShoppingListInterface } from '../../../core/type/product.interface';
import { FirebaseService } from '../../../core/services/firebase.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shopping-lists',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './shopping-lists.component.html',
  styleUrl: './shopping-lists.component.scss'
})


export class ShoppingListsComponent implements OnInit{
  

  nameShoppingListInput: string;
  shoppingList:ShoppingListInterface[] = [];
  products: ProductInterface[] = [];
  firebaseService= inject(FirebaseService);

  ngOnInit(): void {
    this.firebaseService.getShoppingLists().subscribe(shoppingList =>{
      this.shoppingList = shoppingList
    })
  }

  addShoppingList(name:string) {
    console.log(name)
    this.firebaseService.addShoppingList(name)
    name="";
  }

  makeActiveList(arg0: string) {

  }
}
