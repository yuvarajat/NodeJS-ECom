import UserModel from '../user/user.model.js';

let id = 0;

export default class ProductModel {
  constructor(name, desc, price) {
    this.id = ++id;
    this.name = name;
    this.desc = desc;
    this.price = price;
  }

  static add(product) {
    product.id = products.length + 1;
    products.push(product);
    return products;
  }

  static get(id) {
    const product = products.find((p) => p.id === id);
    return product;
  }

  static filter(minPrice, maxPrice, desc) {
    const result = products.filter((product) => {
      return (
        (!minPrice || product.price >= minPrice) &&
        (!maxPrice || product.price <= maxPrice) &&
        (!desc || product.desc == desc)
      );
    });
    return result;
  }

  static getAllProducts() {
    return products;
  }

  static rate(productId, userId, rating) {
    const user = UserModel.getAll().find((u) => u.id == userId);

    if (!user) {
      return {
        success: false,
        msg: "user not found",
      };
    }
  
    const product = products.find((p) => p.id == productId);
  
    if (!product) {
      return {
        success: false,
        msg: "product not found",
      };
    }
  
    if (rating > 5 || rating <= 0) {
      return {
        success: false,
        msg: "rating should be b/w 0 and 5",
      };
    }
  
    if (!product.rating) {
      product.rating = [];
      product.rating.push({ userId: userId, rating: rating });
    } else {
      const existingRating = product.rating.find((u) => u.userId == userId);
      if (!existingRating) {
        product.rating.push({ userId: userId, rating: rating });
      } else {
        existingRating.rating = rating;
      }
    }
    return {
      success: true,
      msg: product,
    };
  }
}

var products = [
  new ProductModel("Iphone 13", "Mobile", 50000),
  new ProductModel("Xiaomi 11 Lite NE 5G", "Mobile", 20000),
  new ProductModel("Men's White Shirt", "Fashion", 1000),
  new ProductModel("Black Sports Shoe", "Fashion", 3000),
];
