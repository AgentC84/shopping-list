import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ProductInterface } from '../../../core/type/product.interface';
import { FirebaseService } from '../../../core/services/firebase.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})


export class ProductCardComponent {

  @Input() product: ProductInterface;

  firebaseService= inject(FirebaseService);

  decreaseAmount(product: ProductInterface) {
    if (product.amount > 1) { 
      this.updateProduct(product, { amount: product.amount - 1 });
    }
  }

  increaseAmount(product: ProductInterface) {
    if (product.amount < 99) {
      this.updateProduct(product, { amount: product.amount + 1 });
    }
  }

  updateProduct(product:ProductInterface , updatedFields: Partial<ProductInterface>){
    this.firebaseService.updateProduct(product.id, updatedFields)
  }

  getCategoryClass (categoryCode : string): string {
    return `color-category-${categoryCode}`;
  }

  getCategoryIcon( categoryCode: string): string {
    const icons: Record<string, string> = {
      fruits: 'fruits.svg',
      cereals: 'cereals.svg',
      sweet: 'cupcake.svg',
      vegetables: 'vegetables.svg',
      chemicals: 'chemicals.svg',
      drinks: 'drinks.svg',
      milk: 'milk.svg',
      bread: 'bread.svg',
      meat: 'meat.svg',
      others: 'others.svg'
    };


    return icons[categoryCode]? icons[categoryCode] : 'others.svg';
  }
  
  deleteProduct(id: string) {
    console.log(id)
    this.firebaseService.deleteProduct(id)
  }


}
