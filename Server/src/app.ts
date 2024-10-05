import express from "express";
import { Application, Request, Response } from "express";
import authRoutes from "./routes/auth.js";
import bodyParser from "body-parser";

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.use(authRoutes);
app.listen(5333, () => {
  console.log("Server running at port 5333 and testing!!");
});
