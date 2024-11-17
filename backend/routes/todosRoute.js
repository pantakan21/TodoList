import express from "express";
import {Todo} from "../models/todosModel.js";

const router = express.Router();

// Route for save a new todo
router.post("/", async(request, response) => {
    try {
        // ข้อมูลถูกส่งมาครบไหม
        if(!request.body.title || !request.body.description || !request.body.dueDate || !request.body.priority) {
            return response.status(400).send({
                message: "Send all required fields : title, dueDate, priority",
            });
        }

        const newTodo = {
            title: request.body.title,
            description: request.body.description,
            dueDate: request.body.dueDate,
            priority: request.body.priority,
        };

        const todo = await Todo.create(newTodo);
        return response.status(201).send(todo);
    }

    catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route for get all todos
router.get("/", async(request, response) => {
    try {
        const todos = await Todo.find({});

        return response.status(200).json({
            count: todos.length,
            data: todos
        });
    }
    catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route for get one todo by id
router.get("/:id", async(request, response) => {
    try {
        const {id} = request.params;
        const todo = await Todo.findById(id);

        return response.status(200).json(todo);
    }
    catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route for update a todo
router.patch("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const updateData = request.body;

        const result = await Todo.findByIdAndUpdate(id, updateData, { new: true });

        if (!result) {
            return response.status(404).json({ message: "Todo not found" });
        }

        return response.status(200).send({ message: "Todo updated successfully", data: result });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for delete a todo
router.delete("/:id", async(request, response) => {
    try {
        const {id} = request.params;
        const result = await Todo.findByIdAndDelete(id);

        if(!result) {
            return response.status(404).json({message: "Todo not found"});
        }

        return response.status(200).send({message: "Todo deleted successfully"});
    }
    catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

export default router;