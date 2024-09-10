import { Component, HostListener, inject, OnInit } from '@angular/core';
import { FirebaseService } from '../../../core/services/firebase.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryInterface, ProductInterface } from '../../../core/type/product.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-product',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule,  CommonModule],
  templateUrl: './form-product.component.html',
  styleUrl: './form-product.component.scss'
})
export class FormProductComponent implements OnInit {

  addProductForm: FormGroup; 
  preparedProducts: ProductInterface[] = []; 
  filteredProducts: ProductInterface[] = [];
  showAdditionalFields: boolean = false;
  firebaseService= inject(FirebaseService);

  categories: CategoryInterface[] = [];
  isDropdownOpen: boolean = false;

  constructor(private fb: FormBuilder){
    this.addProductForm = this.fb.group({
      productName: [''], 
      category: [''],    
      amount: [1]      
    });
  }

  ngOnInit(): void {
    this.firebaseService.getCategories().subscribe(categories =>{
      this.categories = categories
    })
    this.firebaseService.getPreparedProducts().subscribe(preparedProducts =>{
      this.preparedProducts = preparedProducts
    })
  }

  onSearch() {
    const searchTerm = this.addProductForm .get('productName')?.value; 
    console.log(searchTerm);
    if (searchTerm.trim() !== '') { 
      this.isDropdownOpen = true;
      this.showAdditionalFields = true;
      this.filteredProducts = this.preparedProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) 
      );
    } else {
      
      this.filteredProducts = [];
      this.showAdditionalFields = false;
      this.isDropdownOpen = false; 
    }
  }

  selectProduct(product: ProductInterface) {
    console.log(product)
    this.addProductForm.patchValue({ productName: product.name, category: product.category});
    this.filteredProducts = [];
    this.isDropdownOpen = false; 
    
  }

  addProduct() {
    if (this.showAdditionalFields) {
      const newProduct = {
        name: this.addProductForm.get('productName')?.value,
        category: this.addProductForm.get('category')?.value,
        amount: this.addProductForm.get('amount')?.value,
        purchased: false,
      };

      this.firebaseService.addProduct(newProduct);
    }

    this.resetFields();
  }

  resetFields() {
    this.addProductForm.reset({ productName: '', category: '', amount: 1 });
    this.filteredProducts = [];
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const dropdownMenu = document.querySelector('.form-add-product__dropdown-menu');
    
    
    if (this.isDropdownOpen && dropdownMenu && !dropdownMenu.contains(target)) {
      this.isDropdownOpen = false; 
    }
  }
}
