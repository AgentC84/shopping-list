import { Component, Input } from '@angular/core';
import { ProductInterface } from '../../../core/type/product.interface';

import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})


export class ProductListComponent  {
  @Input() products: ProductInterface[];
  
  log(product:ProductInterface) {
    console.log(product)
  }
}
