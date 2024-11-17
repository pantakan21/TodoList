import React from 'react'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import {AiOutlineClose} from "react-icons/ai"
import "./DeleteTodoModal.css"

const DeleteTodoModal = ({onClose, todoId}) => {
    const {enqueueSnackbar} = useSnackbar();

    const handleDeleteTodo = () => {
        axios
            .delete(`http://localhost:8080/todos/${todoId}`)
            .then(() => {
                enqueueSnackbar("Todo Deleted Successfully", {variant: "success"});
                onClose();
            })
            .catch((error) => {
                console.log(error);
                enqueueSnackbar("Error", {variant: "error"});
            })
    };

    return (
        <div className= 'create-todo-modal' onClick={onClose}>
            <div className="modal-container" onClick={(event) => event.stopPropagation()}>
                <AiOutlineClose className='close-icon' onClick={onClose}/>
                <h1>Are you sure you want to delete this todo ?</h1>
                <button className="delete-btn" onClick={handleDeleteTodo}>Yes, Delete it</button>
                <button className="cancel-btn" onClick={onClose}>Back</button>
            </div>
        </div>    
    )
}

export default DeleteTodoModal
