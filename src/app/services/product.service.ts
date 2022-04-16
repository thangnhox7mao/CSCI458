import { Injectable } from '@angular/core';

import {
  Firestore,
  collectionData,
  collection,
  docData,
  addDoc,
  doc,
} from '@angular/fire/firestore';
import { deleteDoc, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

export interface IProduct {
  title: string;
  description: string;
  id?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(public firestore: Firestore) {}

  getProducts(): Observable<IProduct[]> {
    const productsRef = collection(this.firestore, 'products');
    return collectionData(productsRef, { idField: 'id' }) as Observable<
      IProduct[]
    >;
  }

  getProductById(id): Observable<IProduct> {
    const productsRef = doc(this.firestore, `products/${id}`);
    return docData(productsRef, { idField: 'id' }) as Observable<IProduct>;
  }

  addProduct(product: IProduct) {
    const productsRef = collection(this.firestore, 'products');
    return addDoc(productsRef, product);
  }

  deleteProduct(product: IProduct) {
    const productDotRef = doc(this.firestore, `products/${product.id}`);
    return deleteDoc(productDotRef);
  }

  updateProduct(product: IProduct) {
    const productDotRef = doc(this.firestore, `products/${product.id}`);
    return updateDoc(productDotRef, {
      title: product.title,
      description: product.description,
    });
  }
}
