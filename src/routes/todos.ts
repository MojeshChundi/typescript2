import { Router } from "express";
import { Todo } from "../models/todo";

const router = Router();
let todos: Todo[] = [];
type RequestBody = { text: String };
type RequestParams = { todoId: String };
router.get("/", (req, res, next) => {
  res.send({ todos: todos });
});
router.post("/todo", (req, res, next) => {
  const body = req.body as RequestBody;
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: body.text,
  };
  todos.push(newTodo);
  res.status(201).json({ message: "added todo", todo: newTodo, todos: todos });
});

router.put("todos/:todoId", (req, res, next) => {
  const body = req.body as RequestBody;
  const params = req.params as RequestParams;
  const tid = params.todoId;
  const todoIndex = todos.findIndex((todosIndex) => todosIndex.id === tid);
  if (todoIndex >= 0) {
    todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
    return res.status(200).json({ message: "to id updated!", todos: todos });
  }
  res.status(401).json({ message: "id could not found!" });
});

router.delete("/todo/:todoId", (req, res, next) => {
  const params = req.params as RequestParams;
  todos = todos.filter((todoItem) => todoItem.id !== params.todoId);
  res.status(200).json({ message: "delete todo", todos: todos });
});
export default router;
