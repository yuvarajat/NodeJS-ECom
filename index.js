import express from "express";
import bodyParser from "body-parser";
import router from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import cartRouter from "./src/features/cart/cart.routes.js";
// import basicAuthorizer from './src/middlewares/basicAuth.middleware.js';
import jwtAuth from "./src/middlewares/jwtAuth.middleware.js";
import loggerMiddleware from "./src/middlewares/logger.middleware.js";


const app = express();

app.use(bodyParser.json());

app.use(loggerMiddleware);
// app.use('/api/products', basicAuthorizer, router);
app.use("/api/product", jwtAuth, router);
app.use("/api/user", userRouter);
app.use("/api/cart", jwtAuth, cartRouter);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use((req, res) => {
  res.status(404).send("API Not Found");
})

export default app;
