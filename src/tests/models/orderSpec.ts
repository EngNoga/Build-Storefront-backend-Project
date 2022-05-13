import { Order, OrderStore } from "../../models/order";
import { User, UserStore } from "../../models/user";

const store = new OrderStore();
let order: Order;
const userstore = new UserStore();
let user: User;

describe("Order Model", () => {
  beforeAll(async () => {
    user = await userstore.create({
      firstname: "naglaa",
      lastname: "mohamed",
      username: "noga245",
      password: "noga",
      email: "noga@yahoo.com",
    });
  });

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

  it("create method should add a new order", async () => {
    order = await store.create({
      user_id: user.id as number,
      status: "active",
    });

    expect(parseInt(order.user_id as unknown as string)).toEqual(
      user.id as number
    );
    expect(order.status).toEqual("active");
  });

  it("index method should return list of order", async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        user_id: "1" as unknown as number,
        status: "active",
      },
    ]);
  });

  it("show method should the order with id", async () => {
    const result = await store.show("1");
    expect(result).toEqual({
      id: 1,
      user_id: "1" as unknown as number,
      status: "active",
    });
  });

  it("delete method should remove the order with id", async () => {
    await store.delete("1");
    const result = await store.index();
    expect(result).toEqual([]);
  });

  afterAll(async () => {
    await store.reset();
    await userstore.reset();
  });
});
