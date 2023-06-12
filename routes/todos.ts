import { Router } from "express";
import { Todo } from "../models/todo";

const router = Router();
let todos: Todo[] = [];
router.get("/", (req, res, next) => {
  res.send({ todos: todos });
});
router.post("/todo", (req, res, next) => {
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: req.body.text,
  };
  todos.push(newTodo);
  res.status(201).json({ message: "added todo", todo: newTodo, todos: todos });
});

router.put("todos/:todosid", (req, res, next) => {
  const tid = req.params.todosid;
  const todoIndex = todos.findIndex((todosIndex) => todosIndex.id === tid);
  if (todoIndex >= 0) {
    todos[todoIndex] = { id: todos[todoIndex].id, text: req.body.text };
    return res.status(200).json({ message: "to id updated!", todos: todos });
  }
  res.status(401).json({ message: "id could not found!" });
});

router.delete("/todo/:todoid", (req, res, next) => {
  todos = todos.filter((todoItem) => todoItem.id !== req.params.todoid);
  res.status(200).json({ message: "delete todo", todos: todos });
});
export default router;
