import CartModel from "./cart.model.js";

export default class CartController {
  addToCart(req, res) {
    const productId = req.query.productId;
    const userId = req.userId;
    const quantity = req.query.quantity;
    const result = CartModel.add(productId, userId, quantity);
    res.status(201).send(result);
  }

  getUserCart(req, res) {
    res.status(200).send(CartModel.getUserCart(req.userId));
  }

  deleteCartItem(req, res) {
    const result = CartModel.deleteItem(req.params.id, req.userId);
    res.status(200).send(result);
  }
}
