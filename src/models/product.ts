import Client from "../database";

export type Product = {
  id?: number;
  product_name: string;
  price: number;
  category: string;
};

export class ProductStore {
  /*index method (get all products)*/
  /**
   * write selection sql query
   * connect the dev or test DB (change from the database.json according the ENV variable in .env file)
   * run the sql query by using (query function)
   * then close the connection
   */
  async index(): Promise<Product[]> {
    try {
      const sql = "SELECT * FROM products";
      const conn = await Client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error:${err}`);
    }
  }

  //-------------------------------------------------------------

  /** get one product by id*/
  /**
   * write selection sql query where id = (args:id)
   * connect the dev or test DB (change from the database.json according the ENV variable in .env file)
   * run the sql query by using (query function) with pass the parameters
   * then close the connection
   */

  async show(id: string): Promise<Product> {
    try {
      const sql = "SELECT * FROM products where id =($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find this product ${id} . Error:${err}`);
    }
  }

  //--------------------------------------

  /** create new product*/
  /**
   * write Insertion sql query
   * connect the dev or test DB (change from the database.json according the ENV variable in .env file)
   * run the sql query by using (query function) with product json object
   * then close the connection
   */
  async create(p: Product): Promise<Product> {
    try {
      const sql =
        "INSERT INTO products(product_name,price,category)VALUES($1,$2,$3) RETURNING *";
      const conn = await Client.connect();
      const result = await conn.query(sql, [
        p.product_name,
        p.price,
        p.category,
      ]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      console.log(err);
      throw new Error(`Could not add new product . Error:${err}`);
    }
  }

  //------------------------------------------------------------

  /** delete one product*/
  /**
   * write delete sql query
   * connect the dev or test DB (change from the database.json according the ENV variable in .env file)
   * run the sql query by using (query function) with id parameter
   * then close the connection
   */
  async delete(id: string): Promise<Product> {
    try {
      const sql = "DELETE FROM products WHERE id = ($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      const product = result.rows[0];
      return product;
    } catch (err) {
      throw new Error(`Could not delete product ${id} . Error:${err}`);
    }
  }

  //-------------------------------------------------------------
  //this method to empty table and reset the id serial after the test model
  async reset(): Promise<void> {
    try {
      const sql = "DELETE FROM products";
      const sql1 = "ALTER SEQUENCE products_id_seq RESTART WITH 1";
      const conn = await Client.connect();
      await conn.query(sql);
      await conn.query(sql1);
      conn.release();
    } catch (err) {
      throw new Error(`Could not reset products table . Error:${err}`);
    }
  }
}
