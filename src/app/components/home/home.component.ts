import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from '../../core/services/firebase.service';
import { ProductInterface, ShoppingListInterface } from '../../core/type/product.interface';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormProductComponent } from '../layout/form-product/form-product.component';
import { ShoppingListsComponent } from '../layout/shopping-lists/shopping-lists.component';
import { ProductListComponent } from '../layout/product-list/product-list.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, FormProductComponent, ShoppingListsComponent, ProductListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',

})


export class HomeComponent implements OnInit{

  title: string = 'Списки покупок'

  currentList: ShoppingListInterface;
  products: ProductInterface[] = [];
  shoppingList:ShoppingListInterface[] = []
  shoppingListWithProducts:ProductInterface[] = []; 

  firebaseService= inject(FirebaseService);
  authService = inject(AuthService);

  ngOnInit(): void {
    this.firebaseService.getProducts().subscribe(products =>{
      this.products = products
    })

    // this.firebaseService.getShoppingLists().subscribe(shoppingList =>{
    //   this.shoppingList = shoppingList
    //   this.currentList = this.shoppingList[0];
    // })
    //setTimeout(() => {console.log('листы', this.currentList)}, 5000)
    
  }

  convertTimestampToDate(timestamp: { seconds: number, nanoseconds: number }): Date {
    return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
  }

  // getShoppingListWithProducts(productlistId:string) {
   
  //   this.firebaseService.getShoppingListWithProducts(productlistId).subscribe(shoppingList =>{
  //     this.products = shoppingList
  //   })
  //   //setTimeout(() => {console.log('результат',  this.shoppingListWithProducts)}, 3000)
  // }

  // updateProduct(product:ProductInterface , updatedFields: Partial<ProductInterface>){
  //   this.firebaseService.updateProduct(product.id, updatedFields)
  // }

  logout() {
    this.authService.logout();
  }

}
