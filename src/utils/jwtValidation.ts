import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.get("Authorization");
    if (authHeader) {
      const bearer = authHeader.split(" ")[0].toLowerCase();
      const token = authHeader.split(" ")[1];
      const jwtSecret = process.env.TOKEN_SECRET as unknown as string;
      if (token && bearer === "bearer") {
        const decode = jwt.verify(token, jwtSecret);
      }
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(401);
  }
};

export default verifyAuthToken;
