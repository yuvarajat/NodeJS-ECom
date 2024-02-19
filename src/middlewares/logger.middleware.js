import fs from "fs";

const fsPromise = fs.promises;

async function log(logData) {
  try {
    logData = `\n${new Date().toString()} + ". Log Data:" + ${logData}`;
    await fsPromise.appendFile("logger.txt", logData);
  } catch (err) {
    console.log(err);
  }
}

const loggerMiddleware = async (req, res, next) => {
  if (!req.url.includes("signin") && !req.url.includes("signup")) {
    const logData = `${req.url} - ${JSON.stringify(req.body)}`;
    await log(logData);
  }
  next();
};

export default loggerMiddleware;
