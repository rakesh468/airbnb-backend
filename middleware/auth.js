import jwt from "jsonwebtoken";

//custom middleware to validate token//
export const auth = (request, response, next) => {
  try {
    const token = request.header("X-auth-token");
    console.log("token", token);
    jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (err) {
    response.status(401).send({ message: err.message });
  }
};
