"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
let todos = [];
router.get("/", (req, res, next) => {
    res.send({ todos: todos });
});
router.post("/todo", (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text,
    };
    todos.push(newTodo);
    res.status(201).json({ message: "added todo", todo: newTodo, todos: todos });
});
router.put("todos/:todoId", (req, res, next) => {
    const body = req.body;
    const params = req.params;
    const tid = params.todoId;
    const todoIndex = todos.findIndex((todosIndex) => todosIndex.id === tid);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
        return res.status(200).json({ message: "to id updated!", todos: todos });
    }
    res.status(401).json({ message: "id could not found!" });
});
router.delete("/todo/:todoId", (req, res, next) => {
    const params = req.params;
    todos = todos.filter((todoItem) => todoItem.id !== params.todoId);
    res.status(200).json({ message: "delete todo", todos: todos });
});
exports.default = router;
