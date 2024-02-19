import UserModel from "../features/user/user.model.js";

const basicAuthorizer = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  if (!authHeader) {
    return res.status(401).send("No Authorization Details Found");
  }

  const base64Creds = authHeader.replace("Basic ", "");

  const decodedCreds = Buffer.from(base64Creds, "base64").toString("utf8");

  const creds = decodedCreds.split(":");

  const user = UserModel.db.find(
    (u) => u.email == creds[0] && u.password == creds[1]
  );

  if (user) {
    next();
  } else {
    return res.status(401).send("Incorrect Credentials");
  }
};


export default basicAuthorizer;