import express, { Request, Response } from "express";
import "./db";
import addRoutesToApp from "./combined-routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
addRoutesToApp(app);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World!");
});

export default app;
