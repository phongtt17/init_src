import Dexie from 'dexie';

import { IProduct } from '@/types/product';

class Products extends Dexie {
  products: Dexie.Table<IProduct, number>;
  private static instance: Products;

  constructor() {
    super('Products');
    this.version(1).stores({
      products: '++id, barcode, name',
    });
    this.products = this.table('products');
  }

  public static getInstance(): Products {
    if (!Products.instance) {
      Products.instance = new Products();
    }
    return Products.instance;
  }
}

// Reconnect if connect network close
async function checkConnection(): Promise<boolean> {
  const db = Products.getInstance();
  if (db.isOpen()) {
    return true;
  } else {
    await db.open();
    return db.isOpen();
  }
}
// Add a product
async function addProduct(newProduct: IProduct): Promise<number> {
  const db = Products.getInstance();
  try {
    return await db.products.add(newProduct);
  } catch (error) {
    console.error(error)
    return 0
  }
}

// Get all products with a given keyword
async function getAllProduct(): Promise<IProduct[]> {
  const db = Products.getInstance();
  return await db.products.toArray()
}

// Update a product with a given ID
async function updateProduct(id: number, updatedFields: Partial<IProduct>): Promise<void> {
  const db = Products.getInstance();
  try {
    await db.products.update(id, updatedFields);
  } catch (error) {
    console.error('Error searching for products', error);    
  }
}

// Delete a product with a given ID
async function deleteProduct(id: number): Promise<void> {
  const db = Products.getInstance();
  await db.products.delete(id);
}

export { addProduct, updateProduct, deleteProduct, getAllProduct, checkConnection };
