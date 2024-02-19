import express from "express";
import ProductController from "./product.controller.js";
import fileuploadMiddleware from "../../middlewares/fileupload.middleware.js";

const router = express.Router();

const productController = new ProductController();

router.get("/", productController.getProducts);
router.post(
  "/",
  fileuploadMiddleware.single("imageUrl"),
  productController.addProduct
);
router.get("/filter", productController.getFilteredProducts);
router.post("/rateproduct", productController.rateProduct);
router.get("/:id", productController.getProduct);


export default router;
