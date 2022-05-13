import express, { Request, Response } from "express";
import { Order, OrderStore } from "../models/order";
import verifyAuthToken from "../utils/jwtValidation";

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index();
    return res.json(orders);
  } catch (err) {
    res.status(400);
    return res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const order = await store.show(req.params.id);
    return res.json(order);
  } catch (err) {
    res.status(400);
    return res.json(err);
  }
};

const showByUserId = async (req: Request, res: Response) => {
  try {
    const order = await store.showByUserId(req.params.user_id);
    return res.json(order);
  } catch (err) {
    res.status(400);
    return res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      user_id: req.body.user_id,
      status: req.body.status,
    };
    const newOrder = await store.create(order);
    return res.json(newOrder);
  } catch (err) {
    res.status(400);
    return res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(req.params.id);
    res.json(deleted);
  } catch (err) {
    res.status(400);
    return res.json(err);
  }
};

const orderRoutes = (app: express.Application) => {
  app.get("/orders", verifyAuthToken, index);
  app.get("/orders/:id", verifyAuthToken, show);
  app.get("/orders/current/:user_id", verifyAuthToken, showByUserId);
  app.post("/orders", verifyAuthToken, create);
  app.delete("/orders/:id", verifyAuthToken, destroy);
};

export default orderRoutes;
