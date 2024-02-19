import express from "express";
import UserController from "./user.controller.js";

const router = express.Router();

const userController = new UserController();

router.post('/signup', userController.signupUser);
router.post('/signin', userController.signinUser);
router.get('/getall', userController.getAll);

export default router;