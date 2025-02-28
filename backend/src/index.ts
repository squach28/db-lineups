import express from "express";
import cors from "cors";
import { paddlersRouter } from "./routes/paddlers.routes";
import { adminRouter } from "./routes/admin.routes";
import { lineupsRouter } from "./routes/lineups.routes";

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
app.use("/admin", adminRouter);
app.use("/lineups", lineupsRouter);

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
