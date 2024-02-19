import ProductModel from "./product.model.js";

export default class ProductController {
  getProducts(req, res) {
    const products = ProductModel.getAllProducts();
    res.send(products);
  }

  addProduct(req, res) {
    const { name, desc, price } = req.body;
    const newProduct = {
      name,
      desc,
      price: parseFloat(price),
      // imageUrl: req.file.filename,
    };
    const createdRecord = ProductModel.add(newProduct);
    res.status(201).send(createdRecord);
  }

  getProduct(req, res) {
    const id = req.params.id;
    const product = ProductModel.get(id);
    if (!product) {
      res.status(404).send("Product not found");
    } else {
      res.status(200).send(product);
    }
  }

  getFilteredProducts(req, res) {
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    const desc = req.query.desc;
    const result = ProductModel.filter(minPrice, maxPrice, desc);
    res.status(200).send(result);
  }

  rateProduct(req, res) {
    const productId = req.query.productId;
    const userId = req.query.userId;
    const rating = req.query.rating;
    const result = ProductModel.rate(productId, userId, rating);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).send(result);
    }
  }
}
