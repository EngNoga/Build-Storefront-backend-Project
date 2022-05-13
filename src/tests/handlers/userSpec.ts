import supertest from "supertest";
import { User, UserStore } from "../../models/user";
import app from "../../server";

const userstore = new UserStore();
const request = supertest(app);
let token = "";

describe("Users API Endpoints", () => {
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
  });

  describe("Test Authenticate methods", () => {
    // test the endpoints for the authenticate method for users
    // for user name and password is correct
    it("should be able to authenticate to get token", async () => {
      const res = await request
        .post("/users/authenticate")
        .set("Content-type", "application/json")
        .send({
          username: "noga245",
          password: "noga",
        });
      expect(res.status).toBe(200);
      const { id, username, token: userToken } = res.body.data;
      expect(id).toBe(user.id);
      expect(username).toBe("noga245");
      token = userToken;
    });
    // for username or password is not correct
    it("should be failed to authenticate with wrong username", async () => {
      const res = await request
        .post("/users/authenticate")
        .set("Content-type", "application/json")
        .send({
          username: "noga548",
          password: "test",
        });
      expect(res.status).toBe(401);
    });
  });

  //---------------------------------------------------------------------------------
  describe("Test Users Endpoints for Handlers", () => {
    //test the endpoint to create new user
    it("test the endpoint for creating new user", async () => {
      const res = await request
        .post("/users")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          firstname: "naglaa",
          lastname: "mohamed",
          username: "noga245",
          password: "noga",
          email: "noga@yahoo.com",
        } as User);
      expect(res.status).toBe(200);
      const { firstname, lastname, username, email } = res.body.data;
      expect(firstname).toBe("naglaa");
      expect(lastname).toBe("mohamed");
      expect(username).toBe("noga245");
      expect(email).toBe("noga@yahoo.com");
    });
    //----------------------------------------------------------------------------

    //test the endpoint to get all users
    it("test the endpoint for getting all users", async () => {
      const res = await request
        .get("/users")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
    });
    //-----------------------------------------------------------------------------

    //test the endpoint to get one user
    it("test the endpoint for getting one user", async () => {
      const res = await request
        .get(`/users/${user.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.username).toBe("noga245");
      expect(res.body.email).toBe("noga@yahoo.com");
    });
    //------------------------------------------------------------------------------

    //test the endpoint to delete one user
    it("test the endpoint for deleting one user", async () => {
      const res = await request
        .delete(`/users/${user.id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
    });
    //-----------------------------------

    //to delete user data and reset id
    afterAll(async () => {
      await userstore.reset();
    });
  });
});
