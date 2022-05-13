import supertest from "supertest";
import { User, UserStore } from "../../models/user";
import { Order, OrderStore } from "../../models/order";
import app from "../../server";

const userstore = new UserStore();
const orderstore = new OrderStore();
const request = supertest(app);
let token = "";
let order: Order;

describe("Orders API Endpoints", () => {
  const user = {
    firstname: "naglaa",
    lastname: "mohamed",
    username: "noga245",
    password: "noga",
    email: "noga@yahoo.com",
  } as User;

  beforeAll(async () => {
    const createdUser = await userstore.create(user);
    user.id = createdUser.id;

    order = {
      user_id: user.id,
      status: "active",
    } as Order;

    const createdOrder = await orderstore.create(order);
    order.id = createdOrder.id;
  });

  describe("Test Authenticate methods", () => {
    beforeEach(function () {
      const originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
    });

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
  describe("Test Orders Endpoints For Handlers", () => {
    //test the endpoint to create new order
    it("test the endpoint for creating new order", async () => {
      const res = await request
        .post("/orders")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          user_id: user.id,
          status: "active",
        } as Order);
      expect(res.status).toBe(200);
      const { user_id, status } = res.body;
      expect(parseInt(user_id)).toBe(user.id as number);
      expect(status).toBe("active");
    });
    //----------------------------------------------------------------------------

    //test the endpoint to get all orders
    it("test the endpoint for getting all orders", async () => {
      const res = await request
        .get("/orders")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
    });
    //-----------------------------------------------------------------------------

    //test the endpoint to get one order
    it("test the endpoint for getting one order", async () => {
      const res = await request
        .get(`/orders/${order.id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(parseInt(res.body.user_id)).toBe(user.id as number);
      expect(res.body.status).toBe("active");
    });
    //------------------------------------------------------------------------------

    //test the endpoint to get one order by using user id
    it("test the endpoint for getting one order by user_id", async () => {
      const res = await request
        .get(`/orders/current/${user.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.status).toBe("active");
    });
    //------------------------------------------------------------------------------

    //test the endpoint to delete one order
    it("test the endpoint for deleting one order", async () => {
      const res = await request
        .delete(`/orders/${order.id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
    });
    //-----------------------------------

    //to delete user and order data and reset id
    afterAll(async () => {
      await orderstore.reset();
      await userstore.reset();
    });
  });
});
