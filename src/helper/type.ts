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
    email: string;
    phone: string;
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

   export interface IAddress {
    _id: string;
    userId: string;
    street: string;
    city: string;
    district: string;
   }

   export interface IOrder {
    _id: string;
    userId: string;
    items: ICart[];
    totalMoney: number;
    quantity_item: number;
    status: string;
    address: IAddress;
    paymentMethod: string;
    paidAt: Date;
    createdAt: string;
    updatedAt: string;
   }

   export interface IConversation {
    _id: string;
    type: string;
    name: string;
    members: string[];
    lastMessage: string;
    createdAt: string;
    updatedAt: string;
   }

   export interface IMessage {
    _id: string;
    conversationId: string;
    senderId: string;
    content: string;
    createdAt: string;
    updatedAt: string;
   }