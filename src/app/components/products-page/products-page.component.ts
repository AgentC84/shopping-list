import { Component, inject, OnInit } from '@angular/core';
import { FirebaseService } from '../../core/services/firebase.service';
import { CategoryInterface, ProductInterface } from '../../core/type/product.interface';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../layout/product-card/product-card.component';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [FormsModule, ProductCardComponent],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss'
})
export class ProductsPageComponent implements OnInit {

  newProduct: any;
  title: string = 'Список предустановленых продуктов'
  firebaseService= inject(FirebaseService);
  newNameProduct: string;
  newCategory: string;
  categories: CategoryInterface[] = [];
  preparedProducts: ProductInterface[] = [];
  

  ngOnInit(): void {
    this.firebaseService.getPreparedProducts().subscribe(products =>{
      this.preparedProducts = products
    })

    this.firebaseService.getCategories().subscribe(categories =>{
      this.categories = categories
    })
  }

  

  getCategoryName(categoryCode: string): string {
    const category: Record<string, string> = {
      others: 'Без категории',
      fruits: 'Фрукты',
      vegetables: 'Овощи',
      meat: 'Мясо, птица и рыба',
      milk: 'Молочные продукты',
      bread: 'Хлеб',
      drinks: 'Напитки',
      sweet: 'Сладкое',
      cereals: 'Крупы',
      chemicals: 'Бытовая химия',
      } 
    return category[categoryCode];
  }

  addPreparedProduct(name:string, category: string) {
    this.firebaseService.addPreparedProduct(name, category)
  }

  deletePreparedProduct(id: string) {
    console.log(id)
    this.firebaseService.deletePreparedProduct(id)
  }

  
  
  // addProduct(textInput:string){
        //   console.log(textInput)
        //   this.firebaseService.addProduct(textInput)
        //   //this.newProduct="";
        // }
}
