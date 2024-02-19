let id = 0;
export default class CartModel {
  constructor(productId, userId, quantity) {
    this.id = ++id;
    this.productId = parseInt(productId);
    this.userId = userId;
    this.quantity = parseInt(quantity);
  }

  static add(productId, userId, quantity) {
    if (!userId) {
      return {success: false, msg: "user not found"};
    }

    if (!productId) {
      return {success: false, msg: "product not found"};
    }

    if (quantity < 0) {
      return {success: false, msg: "quantity must be greater than zero"};
    }

    const newCartItem = new CartModel(productId, userId, quantity);
    CartModel.db.push(newCartItem);
    return {success: true, "cart is updated with the cart item": newCartItem};
  }

  static db = [new CartModel(2,1,2), new CartModel(3,2,1)];

  static getUserCart(userId) {
    const usersCart = CartModel.db.filter(u => u.userId === userId);
    return usersCart;
  }

  static deleteItem(cartId, userId) {
    const cartItemIndex = CartModel.db.findIndex(u => u.id == cartId && u.userId == userId);
    if (cartItemIndex==-1){
        return {success: false, msg: "Cart item not found"};
    } else {
        CartModel.db.splice(cartItemIndex, 1);
        return {success: true, msg: "Item deleted successfully"}
    }
  }
}
