import express from "express";
import cors from "cors";
import { paddlersRouter } from "./routes/paddlers.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/paddlers", paddlersRouter);

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
