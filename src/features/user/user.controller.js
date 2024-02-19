import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";

export default class UserController {
  signupUser(req, res) {
    const { name, email, password } = req.body;
    const user = UserModel.create(name, email, password);
    res.status(201).send(user);
  }

  signinUser(req, res) {
    const { email, password } = req.body;
    const result = UserModel.check(email, password);
    if (!result) {
      res.status(400).send("Incorrect username or password");
    } else {
      const token = jwt.sign(
        {userId: result.id, email: result.email },
        "A8K6ymWwf2B27SlGgmclssEPphEwTPN7",
        { expiresIn: "1h" }
      );
      res.status(200).send(token);
    }
  }

  getAll(req, res) {
    res.send(UserModel.getAll());
  }
}
