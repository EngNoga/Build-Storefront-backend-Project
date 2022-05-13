import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import productRoutes from "./handlers/product";
import orderRoutes from "./handlers/order";
import userRoutes from "./handlers/user";
import productOrderRoutes from "./handlers/product_order";
import cors from "cors";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";
const PORT: number = 3000;

app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

//the handler routes(endpoints)
productRoutes(app);
orderRoutes(app);
userRoutes(app);
productOrderRoutes(app);
/*app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});*/

app.listen(PORT, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
