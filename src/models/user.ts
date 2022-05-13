import Client from "../database";
import bcrypt from "bcrypt";

export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  username: string;
  password?: string;
  email: string;
};

export class UserStore {
  //index method (get all users)

  async index(): Promise<User[]> {
    try {
      //id,firstname,lastname,username,email
      const sql = "SELECT id,firstname,lastname,username,email FROM users";
      const conn = await Client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error:${err}`);
    }
  }

  //-------------------------------------------------------------

  // get one user by id
  async show(id: string): Promise<User> {
    try {
      const sql =
        "SELECT id,firstname,lastname,username,email FROM users where id =($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find this user ${id} . Error:${err}`);
    }
  }

  //--------------------------------------
  //create new user
  async create(u: User): Promise<User> {
    try {
      const sql =
        "INSERT INTO users(firstname,lastname,username,password,email)VALUES($1,$2,$3,$4,$5) RETURNING id,firstname,lastname,username,email";
      const saltRounds: number = parseInt(
        process.env.SALT_ROUNDS as unknown as string
      );
      const pepper: string = process.env.BCRYPT_PASSWORD as unknown as string;
      const conn = await Client.connect();
      const passwordHash = bcrypt.hashSync(u.password + pepper, saltRounds);
      const result = await conn.query(sql, [
        u.firstname,
        u.lastname,
        u.username,
        passwordHash,
        u.email,
      ]);
      const user = result.rows[0];
      const userResult = await conn.query(
        "SELECT id,firstname,lastname,username,email from users WHERE username = ($1)",
        [u.username]
      );
      conn.release();
      return userResult.rows[0];
    } catch (err) {
      console.log(err);
      throw new Error(`Could not add new user . Error:${err}`);
    }
  }

  //----------------------------------------
  //authentication

  async authenticate(username: string, password: string): Promise<User | null> {
    try {
      const sql = "SELECT password from users WHERE username = ($1)";
      const pepper: string = process.env.BCRYPT_PASSWORD as unknown as string;
      const conn = await Client.connect();
      const result = await conn.query(sql, [username]);
      if (result.rows.length) {
        const user = result.rows[0];
        if (bcrypt.compareSync(password + pepper, user.password)) {
          const userResult = await conn.query(
            "SELECT id,firstname,lastname,username,email from users WHERE username = ($1)",
            [username]
          );
          return userResult.rows[0];
        }
      }
      return null;
    } catch (err) {
      throw new Error(`Unable to login:${err}`);
    }
  }

  //------------------------------------------------------------

  //delete one user
  async delete(id: string): Promise<User> {
    try {
      const sql = "DELETE FROM users WHERE id = ($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      const user = result.rows[0];
      return user;
    } catch (err) {
      throw new Error(`Could not delete user ${id} . Error:${err}`);
    }
  }

  async reset(): Promise<void> {
    try {
      const sql = "DELETE FROM users";
      const sql1 = "ALTER SEQUENCE users_id_seq RESTART WITH 1";
      const conn = await Client.connect();
      await conn.query(sql);
      await conn.query(sql1);
      conn.release();
    } catch (err) {
      throw new Error(`Could not reset user table . Error:${err}`);
    }
  }
}
