import Client from "../database";

export type ProductOrder = {
  id?: number;
  product_id: number;
  order_id: number;
  quantity: number;
};

export class ProductOrderStore {
  //index method (get all products)

  async index(): Promise<ProductOrder[]> {
    try {
      const sql = "SELECT * FROM products_orders";
      const conn = await Client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error:${err}`);
    }
  }

  //-------------------------------------------------------------

  // get one product by id
  async show(id: string): Promise<ProductOrder> {
    try {
      const sql = "SELECT * FROM products_orders where id =($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find this product ${id} . Error:${err}`);
    }
  }

  //--------------------------------------
  //create new product
  //---------------------------------------------------------------------
  //add product and order in the products_orders table
  async addProduct(po: ProductOrder): Promise<ProductOrder> {
    // get order to see if it is open
    try {
      const ordersql = "SELECT * FROM orders WHERE id=($1)";
      //@ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(ordersql, [po.order_id]);

      const order = result.rows[0];

      if (order.status !== "active") {
        throw new Error(
          `Could not add product ${po.product_id} to order ${po.order_id} because order status is ${order.status}`
        );
      }

      conn.release();
    } catch (err) {
      throw new Error(`${err}`);
    }

    try {
      const sql =
        "INSERT INTO products_orders (product_id,order_id,quantity) VALUES($1, $2, $3) RETURNING *";
      //@ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [
        po.product_id,
        po.order_id,
        po.quantity,
      ]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${po.product_id} to order ${po.order_id}: ${err}`
      );
    }
  }

  //------------------------------------------------------------

  //delete one product
  async delete(id: string): Promise<ProductOrder> {
    try {
      const sql = "DELETE FROM products_orders WHERE id = ($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      const product = result.rows[0];
      return product;
    } catch (err) {
      throw new Error(`Could not delete product ${id} . Error:${err}`);
    }
  }

  async reset(): Promise<void> {
    try {
      const sql = "DELETE FROM products_orders";
      const sql1 = "ALTER SEQUENCE products_orders_id_seq RESTART WITH 1";
      const conn = await Client.connect();
      await conn.query(sql);
      await conn.query(sql1);
      conn.release();
    } catch (err) {
      throw new Error(`Could not reset Products_orders table . Error:${err}`);
    }
  }
}
