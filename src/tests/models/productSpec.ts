import { Product, ProductStore } from "../../models/product";

const store = new ProductStore();

describe("Product Model", () => {
  it("Should have on index method", () => {
    expect(store.index).toBeDefined();
  });

  it("Should have on show method", () => {
    expect(store.show).toBeDefined();
  });

  it("Should have on create method", () => {
    expect(store.create).toBeDefined();
  });

  it("Should have on delete method", () => {
    expect(store.delete).toBeDefined();
  });

  it("create method should add a new product", async () => {
    const result = await store.create({
      product_name: "LG_TV",
      price: 3500,
      category: "Electronics",
    });
    expect(result).toEqual({
      id: 1,
      product_name: "LG_TV",
      price: 3500,
      category: "Electronics",
    });
  });

  it("index method should return list of product", async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        product_name: "LG_TV",
        price: 3500,
        category: "Electronics",
      },
    ]);
  });

  it("show method should the product with id", async () => {
    const result = await store.show("1");
    expect(result).toEqual({
      id: 1,
      product_name: "LG_TV",
      price: 3500,
      category: "Electronics",
    });
  });

  it("delete method should remove the product with id", async () => {
    await store.delete("1");
    const result = await store.index();
    expect(result).toEqual([]);
  });

  afterAll(async () => {
    await store.reset();
  });
});
