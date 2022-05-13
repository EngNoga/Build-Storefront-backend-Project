import express, { Request, Response } from "express";
import { Product, ProductStore } from "../models/product";
import verifyAuthToken from "../utils/jwtValidation";

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    return res.json(products);
  } catch (err) {
    res.status(400);
    return res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(req.params.id);
    return res.json(product);
  } catch (err) {
    res.status(400);
    return res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      product_name: req.body.product_name,
      price: req.body.price,
      category: req.body.category,
    };
    const newProduct = await store.create(product);
    return res.json(newProduct);
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
    res.json(err);
  }
};

const productRoutes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", verifyAuthToken, create);
  app.delete("/products/:id", verifyAuthToken, destroy);
};

export default productRoutes;
