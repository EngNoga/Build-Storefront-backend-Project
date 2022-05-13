import supertest from "supertest";
import { User, UserStore } from "../../models/user";
import { Product, ProductStore } from "../../models/product";
import app from "../../server";

const userstore = new UserStore();
const productstore = new ProductStore();
const request = supertest(app);
let token = "";

describe("Products API Endpoints", () => {
  const product = {
    product_name: "LG_TV",
    price: 3500,
    category: "Electronics",
  } as Product;

  const user = {
    firstname: "naglaa",
    lastname: "mohamed",
    username: "noga245",
    password: "noga",
    email: "noga@yahoo.com",
  } as User;
  beforeAll(async () => {
    const createdProduct = await productstore.create(product);
    product.id = createdProduct.id;

    const createdUser = await userstore.create(user);
    user.id = createdUser.id;
  });

  describe("Test Authenticate methods", () => {
    // test the endpoints for the authenticate method for users to return token
    it("should be able to authenticate to get token", async () => {
      const res = await request
        .post("/users/authenticate")
        .set("Content-type", "application/json")
        .send({
          username: "noga245",
          password: "noga",
        });
      expect(res.status).toBe(200);
      const { token: userToken } = res.body.data;
      token = userToken;
    });
  });

  //---------------------------------------------------------------------------------
  describe("Test Products Endpoints for Handlers", () => {
    //test the endpoint to create new product
    it("test the endpoint for creating new product", async () => {
      const res = await request
        .post("/products")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          product_name: "LG_TV",
          price: 3500,
          category: "Electronics",
        } as Product);
      expect(res.status).toBe(200);
      const { product_name, price, category } = res.body;
      expect(product_name).toBe("LG_TV");
      expect(price).toBe(3500);
      expect(category).toBe("Electronics");
    });
    //----------------------------------------------------------------------------

    //test the endpoint to get all products
    it("test the endpoint for getting all products", async () => {
      const res = await request
        .get("/products")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
    });
    //-----------------------------------------------------------------------------

    //test the endpoint to get one product
    it("test the endpoint for getting one product", async () => {
      const res = await request
        .get(`/products/${product.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.product_name).toBe("LG_TV");
      expect(res.body.price).toBe(3500);
    });
    //------------------------------------------------------------------------------

    //test the endpoint to delete one product
    it("test the endpoint for deleting one product", async () => {
      const res = await request
        .delete(`/products/${product.id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
    });
    //-----------------------------------

    //to delete user and product data and reset id
    afterAll(async () => {
      await userstore.reset();
      await productstore.reset();
    });
  });
});
