import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).send("Unauthorized");
  }
  try {
    const payload = jwt.verify(token, "A8K6ymWwf2B27SlGgmclssEPphEwTPN7");
    req.userId = payload.userId;
    console.log(payload);
  } catch (e) {
    return res.status(401).send("Unauthorized");
  }

  next();
};

export default jwtAuth;
