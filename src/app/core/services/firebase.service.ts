import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, deleteDoc, setDoc, collectionGroup  } from '@angular/fire/firestore';
import { CategoryInterface, ProductInterface, ShoppingListInterface } from '../type/product.interface';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { AuthService } from './auth.service';
import { query, where } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  auth = inject(AuthService)
  firestore =inject(Firestore);
  productsCollection = collection(this.firestore, 'products-list');
  preparedProductsCollection = collection(this.firestore, 'prepared-products');
  categoryCollection = collection(this.firestore, 'category');
  shoppingListsCollection = collection(this.firestore, 'shoppingLists');
  shoppingListsCollectionGroup = collectionGroup(this.firestore, 'shoppingLists');

  getProducts(): Observable<ProductInterface[]> {
    return collectionData(this.productsCollection, {
      idField: 'id',
    }) as Observable<ProductInterface[]>;
  }

  getPreparedProducts(): Observable<ProductInterface[]> {
    return collectionData(this.preparedProductsCollection, {
      idField: 'id',
    }) as Observable<ProductInterface[]>;
  }

  getCategories(): Observable<CategoryInterface[]> {
    
    return collectionData(this.categoryCollection, {
      idField: 'id',
    }) as Observable<CategoryInterface[]>;
  }

  getShoppingLists(): Observable<ShoppingListInterface[]> {
    let shoppingLists = collectionData(this.shoppingListsCollectionGroup, {
      idField: 'id',
    })
    setTimeout(() => {console.log('листы с сервиса', this.shoppingListsCollectionGroup)}, 5000)
      return  collectionData(this.shoppingListsCollectionGroup, {
        idField: 'id',
      }) as Observable<ShoppingListInterface[]>;
    
  } 
 

  getShoppingListWithProducts(shoppingListId: string): Observable<ProductInterface[]> {
    let shoppingListWithProducts = collection(this.firestore, `shoppingLists/${shoppingListId}/products`);
    return collectionData(shoppingListWithProducts, {
      idField: 'id',
    }) as Observable<ProductInterface[]>;
    
  }

  addShoppingList(name:string) {
    const shoppingListCreate = { 
      name: name,
      ownerId: 'userId1',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    const promise = addDoc(this.shoppingListsCollection, shoppingListCreate).then(
      (response) => response.id
    );
    return from(promise);
  }

  addProduct(product: Partial<ProductInterface>): Observable<string> {
    const promise = addDoc(this.productsCollection  , {...product, createdAt: new Date()}).then(
      (response) => response.id
    );
    return from(promise);
  }

  addPreparedProduct(name: string, category: string): Observable<string> {
    
    const ProductCreate = { name, category: category };
    console.log(ProductCreate);
    const promise = addDoc(this.preparedProductsCollection  , ProductCreate).then(
      (response) => response.id
    );
    return from(promise);
  }
  
  deleteProduct(id: string): Observable<void> {
    const docRef = doc(this.firestore, 'products-list/' + id);
    const promise = deleteDoc(docRef);
    return from(promise);
  }

  deletePreparedProduct(id: string): Observable<void> {
    const docRef = doc(this.firestore, 'prepared-products/' + id);
    const promise = deleteDoc(docRef);
    return from(promise);
  }

  updateProduct(id: string, dataToUpdate: Partial<ProductInterface>): Observable<void> {
    const docRef = doc(this.firestore, 'products-list/' + id);
    const promise = setDoc(docRef, dataToUpdate, { merge: true }); 
    return from(promise);
  }

  constructor() { }
}
