export interface ICategory {
    _id: string;
    name: string;
    slug: string;
    imageUrl?: string;
    createdAt: string;
    updatedAt: string;
}

export interface IProduct {
    _id: string;
    name: string;
    slug: string;
    imageUrl?: string;
    price: number;
    description: string;
    categoryId: string;
    category: ICategory;
    items: ISize[];
    isWhistlisted: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface IAccount {
    _id: string
    firstName: string
    lastName: string
    avatarUrl: string
}

export interface ISize {
    _id: number
    items: IColor[]
  }
  
  export interface IColor {
    _id: string
    color: string
    stockQuantity: number
    price: number
  }

  export interface IWhistlist {
    _id: string;
    product: IProduct;
    userId: string;
    createdAt: string;  
    updatedAt: string;
   }

   export interface ICart {
    _id: string;
    userId: string;
    product: IProduct;
    quantity: number;
    size: number;
    color: string;
    createdAt: string;
    updatedAt: string;
    price: number;
   }
