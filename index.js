import express from "express";
import connectDB from "./connect.db.js";
import productRoutes from "./product/product.routes.js";

const app = express();

// to make app understand json

app.use(express.json());
//################database connection#######
connectDB();

//#################register routes#########
app.use(productRoutes);

//##############port and server##############
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`App is listening on port${PORT}`);
});
