import express, { Request, Response } from "express";
import { ProductOrder, ProductOrderStore } from "../models/product_order";

const store = new ProductOrderStore();

const index = async (_req: Request, res: Response) => {
  try {
    const productOrder = await store.index();
    return res.json(productOrder);
  } catch (err) {
    res.status(400);
    return res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const productOrder = await store.show(req.body.id);
    res.json(productOrder);
  } catch (err) {
    res.status(400);
    return res.json(err);
  }
};

const addProduct = async (req: Request, res: Response) => {
  const product: ProductOrder = {
    product_id: req.body.product_id,
    order_id: parseInt(req.params.id),
    quantity: parseInt(req.body.quantity),
  };

  try {
    const addedProduct = await store.addProduct(product);
    return res.json(addedProduct);
  } catch (err) {
    res.status(400);
    return res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(req.params.id);
    return res.json(deleted);
  } catch (err) {
    res.status(400);
    return res.json(err);
  }
};

const productOrderRoutes = (app: express.Application) => {
  app.get("/product_orders", index);
  app.get("/products_orders/:id", show);
  app.delete("/products_orders/:id", destroy);
  // add product
  app.post("/orders/:id/products", addProduct);
};

export default productOrderRoutes;
