import express from 'express';

import CartController from './cart.controller.js';

const cartRouter = express.Router();
const cartController = new CartController();

cartRouter.post('/', cartController.addToCart);
cartRouter.get('/', cartController.getUserCart);
cartRouter.delete('/:id', cartController.deleteCartItem);

export default cartRouter;