import express from "express";
import todosRoute from "../src/routes/todos";
const app = express();
app.use(todosRoute);
app.listen(3000);
