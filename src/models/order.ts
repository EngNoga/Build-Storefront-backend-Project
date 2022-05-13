import Client from "../database";

export type Order = {
  id?: number;
  user_id: number;
  status: string;
};

export class OrderStore {
  // index (get All orders)

  async index(): Promise<Order[]> {
    try {
      const sql = "SELECT * FROM orders";
      const conn = await Client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders Error:${err}`);
    }
  }

  //---------------------------------------------------------------------
  //get one order
  async show(id: string): Promise<Order> {
    try {
      const sql = "SELECT * FROM orders where id=($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order number:${id}. Error:${err}`);
    }
  }
  //get order by user_id
  async showByUserId(user_id: string): Promise<Order> {
    try {
      const sql = "SELECT * FROM orders where user_id=($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order number:${user_id}. Error:${err}`);
    }
  }

  //---------------------------------------------------------------------
  //create new order
  async create(o: Order): Promise<Order> {
    try {
      const sql =
        "INSERT INTO orders (user_id,status)VALUES($1,$2) RETURNING *";
      const conn = await Client.connect();
      const result = await conn.query(sql, [o.user_id, o.status]);
      conn.release();
      const order = result.rows[0];
      return order;
    } catch (err) {
      throw new Error(`Could not add new order. Error:${err}`);
    }
  }

  //---------------------------------------------------------------------
  //delete order
  async delete(id: string): Promise<Order> {
    try {
      const sql = "DELETE FROM orders WHERE id = ($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      const order = result.rows[0];
      return order;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error:${err}`);
    }
  }

  async reset(): Promise<void> {
    try {
      const sql = "DELETE FROM orders";
      const sql1 = "ALTER SEQUENCE orders_id_seq RESTART WITH 1";
      const conn = await Client.connect();
      await conn.query(sql);
      await conn.query(sql1);
      conn.release();
    } catch (err) {
      throw new Error(`Could not reset orders table . Error:${err}`);
    }
  }
}
