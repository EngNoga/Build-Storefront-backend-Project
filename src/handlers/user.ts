import express, { Request, Response } from "express";
import { User, UserStore } from "../models/user";
import jwt from "jsonwebtoken";
import verifyAuthToken from "../utils/jwtValidation";

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    return res.json(users);
  } catch (error) {
    res.status(401);
    return res.json({ error });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params.id);
    return res.json(user);
  } catch (error) {
    res.status(401);
    return res.json({ error });
  }
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  };
  try {
    const newUser = await store.create(user);
    const jwtSecret = process.env.TOKEN_SECRET as unknown as string;
    let token = jwt.sign({ user: newUser }, jwtSecret);
    return res.json({
      status: "success",
      data: { ...newUser, token },
      message: "user authenticated successfully",
    });
  } catch (err) {
    res.status(400);
    return res.json(err);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  };
  try {
    const u = await store.authenticate(user.username, user.password as string);
    const jwtSecret = process.env.TOKEN_SECRET as unknown as string;
    const token = jwt.sign({ user: u }, jwtSecret);
    if (!u) {
      res.status(401);
      return res.json({
        status: "failed",
        message: "the username and password do not match please try again",
      });
    }
    return res.json({
      status: "success",
      data: { ...u, token },
      message: "user authenticated successfully",
    });
    //res.json(token);
  } catch (error) {
    res.status(401);
    return res.json({ error });
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(req.params.id);
    return res.json(deleted);
  } catch (error) {
    res.status(401);
    return res.json({ error });
  }
};

const userRoutes = (app: express.Application) => {
  app.get("/users", verifyAuthToken, index);
  app.get("/users/:id", verifyAuthToken, show);
  app.post("/users", verifyAuthToken, create);
  app.post("/users/authenticate", authenticate);
  app.delete("/users/:id", verifyAuthToken, destroy);
};

export default userRoutes;
