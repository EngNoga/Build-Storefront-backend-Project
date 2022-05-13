import { User, UserStore } from "../../models/user";

const store = new UserStore();
let user: User;

describe("User Model", () => {
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

  it("Should have on authenticate method", () => {
    expect(store.authenticate).toBeDefined();
  });

  it("create method should add a new user", async () => {
    user = await store.create({
      firstname: "naglaa",
      lastname: "mohamed",
      username: "noga245",
      password: "noga",
      email: "noga@yahoo.com",
    });
    expect(user.firstname).toEqual("naglaa");
    expect(user.lastname).toEqual("mohamed");
    expect(user.username).toEqual("noga245");
    expect(user.email).toEqual("noga@yahoo.com");
  });

  it("index method should return list of user", async () => {
    const allUser = await store.index();
    expect(allUser[0].firstname).toEqual("naglaa");
    expect(allUser[0].lastname).toEqual("mohamed");
    expect(allUser[0].username).toEqual("noga245");
    expect(allUser[0].email).toEqual("noga@yahoo.com");
  });

  it("show method should the user with id", async () => {
    const oneUser = await store.show(user.id as unknown as string);

    expect(oneUser.firstname).toEqual("naglaa");
    expect(oneUser.lastname).toEqual("mohamed");
    expect(oneUser.username).toEqual("noga245");
    expect(oneUser.email).toEqual("noga@yahoo.com");
  });

  it("authenticate method should the user with id", async () => {
    const result = await store.authenticate("noga45", "noga14");
    expect(result).toBeNull();
  });

  it("delete method should remove the user with id", async () => {
    await store.delete(user.id as unknown as string);
    const result = await store.index();
    expect(result).toEqual([]);
  });

  afterAll(async () => {
    await store.reset();
  });
});
