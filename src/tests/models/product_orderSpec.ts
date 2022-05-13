import { Order, OrderStore } from "../../models/order";
import { Product, ProductStore } from "../../models/product";
import { ProductOrder, ProductOrderStore } from "../../models/product_order";
import { User, UserStore } from "../../models/user";

const store = new ProductOrderStore();
let productOrder: ProductOrder;
const orderstore = new OrderStore();
let order: Order;
const userstore = new UserStore();
let user: User;
const productstore = new ProductStore();
let product: Product;

describe("Order of Products Model", () => {
  beforeAll(async () => {
    user = await userstore.create({
      firstname: "naglaa",
      lastname: "mohamed",
      username: "noga245",
      password: "noga",
      email: "noga@yahoo.com",
    });
    order = await orderstore.create({
      user_id: user.id as number,
      status: "active",
    });

    product = await productstore.create({
      product_name: "LG_TV",
      price: 3500,
      category: "Electronics",
    });
  });

  it("Should have on index method", () => {
    expect(store.index).toBeDefined();
  });

  it("Should have on show method", () => {
    expect(store.show).toBeDefined();
  });

  it("Should have on add product method", () => {
    expect(store.addProduct).toBeDefined();
  });

  it("Should have on delete method", () => {
    expect(store.delete).toBeDefined();
  });

  it("addProduct method should add products to order", async () => {
    productOrder = await store.addProduct({
      product_id: product.id as number,
      order_id: order.id as number,
      quantity: 5,
    });
    expect(parseInt(productOrder.product_id as unknown as string)).toEqual(
      product.id as number
    );
    expect(parseInt(productOrder.order_id as unknown as string)).toEqual(
      order.id as number
    );
    expect(productOrder.quantity).toEqual(5);
  });

  it("index method should return list of order", async () => {
    const result = await store.index();
    expect(parseInt(result[0].product_id as unknown as string)).toEqual(
      product.id as number
    );
    expect(parseInt(result[0].order_id as unknown as string)).toEqual(
      order.id as number
    );
    expect(result[0].quantity).toEqual(5);
  });

  it("show method should the order with id", async () => {
    const result = await store.show(productOrder.id as unknown as string);
    expect(parseInt(result.product_id as unknown as string)).toEqual(
      product.id as number
    );
    expect(parseInt(result.order_id as unknown as string)).toEqual(
      order.id as number
    );
    expect(result.quantity).toEqual(5);
  });

  it("delete method should remove the order with id", async () => {
    await store.delete(productOrder.id as unknown as string);
    const result = await store.index();
    expect(result).toEqual([]);
  });

  afterAll(async () => {
    await store.reset();
    await orderstore.reset();
    await productstore.reset();
    await userstore.reset();
  });
});
