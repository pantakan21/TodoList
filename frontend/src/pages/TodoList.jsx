import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import { FaRegSquareCheck, FaRegSquare } from "react-icons/fa6";
import "./TodoList.css"
import axios from "axios"
import CreateTodoModal from '../components/CreateTodoModal';
import DeleteTodoModal from '../components/DeleteTodoModal';
import EditTodoModal from '../components/EditTodoModal';
import { useSnackbar } from 'notistack'

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [todoId, setTodoId] = useState();
    const {enqueueSnackbar} = useSnackbar();

    const fetchTodos = () => {
        axios
            .get("http://localhost:8080/todos")
            .then((response) => {
                setTodos(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleAddTaskClick = () => {
        setShowCreateModal(true);
    }

    const handleDeleteTaskClick = (todoId) => {
        setTodoId(todoId);
        setShowDeleteModal(true);
    }

    const handleEditTaskClick = (todoId) => {
        setTodoId(todoId);
        setShowEditModal(true);
    }

    const handleCompleteTask = (todoId, currentStatus) => {
        const data = {
            status: currentStatus === "completed" ? "in progress" : "completed"
        };
    
        axios.patch(`http://localhost:8080/todos/${todoId}`, data)
            .then(() => {
                enqueueSnackbar("Change Todo Status Successfully", { variant: "success" });
                fetchTodos();
            })
            .catch((error) => {
                console.error(error.response);
                enqueueSnackbar("Error: " + (error.response?.data?.message || "Request failed"), { variant: "error" });
            });
    }
    
    const handleCloseModal = () => {
        setShowCreateModal(false);
        setShowDeleteModal(false);
        setShowEditModal(false);
        fetchTodos();
    }

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div className='todo-list'>
            <h1>Todo List</h1>
            <div className="button-filter">
                <button className='add-task' onClick = {handleAddTaskClick}>Add Task</button>
                {/* <select className ="filter-task">
                    <option value="all-task">All</option>
                    <option value="todo-task">Todo</option>
                    <option value="done-task">Done</option>
                </select> */}
            </div>
            <div className="container">
                {todos.map((todo) => (
                    <div key = {todo._id} className={`single-task ${todo.priority === "low" ? "low" : todo.priority === "medium" ? "medium" : "high"}`}>
                        <div className="check-icon" onClick={() => handleCompleteTask(todo._id, todo.status)}>
                            {todo.status === "completed" ? (
                                <FaRegSquareCheck className="check-icon-success" />
                            ) : (
                                <FaRegSquare className="check-icon-none" />
                            )}
                        </div>
                        {
                            todo.status === "completed" ? (
                                <p className='completed'>{todo.title}</p>
                            ) : (
                                <p>{todo.title}</p>
                            )
                        }
                        <div className="edit-delete">
                            <FaEdit className ="edit-icon" onClick={() => handleEditTaskClick(todo._id)}></FaEdit>
                            <IoTrashBin className="delete-icon" onClick={() => handleDeleteTaskClick(todo._id)}></IoTrashBin>
                        </div>
                    </div>
                ))}
            </div>

            {showCreateModal && (
                <CreateTodoModal onClose = {handleCloseModal}/>
            )}

            {showDeleteModal && (
                <DeleteTodoModal onClose = {handleCloseModal} todoId = {todoId}/>
            )}

            {showEditModal && (
                <EditTodoModal onClose = {handleCloseModal} todoId = {todoId}/>
            )}
        </div>
    )
}

export default TodoList
