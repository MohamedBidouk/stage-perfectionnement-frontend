import {CartItem} from "./cartItem.model";

export class Cart{
  username!: string;
  cartItems!: CartItem[];
  totalCost!: number;

  constructor(username: string, cartItems: CartItem[]) {
    this.username = username;
    this.cartItems = cartItems;
    let total = 0;
    cartItems.forEach((value: CartItem)=>{
      total+= value.product.price! * value.quantity;
    });
    this.totalCost = total;
  }
}
