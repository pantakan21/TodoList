import React, { useState } from 'react'
import axios from 'axios'
import {useSnackbar} from "notistack"
import "./CreateTodoModal.css"
import {AiOutlineClose } from "react-icons/ai"
import {apiUrl} from "../config/config"

const CreateTodoModal = ({onClose}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [status, setStatus] = useState("in progress");
    const [priority, setPriority] = useState("medium");
    const {enqueueSnackbar} = useSnackbar();

    const handleSaveTodo = () => {
        const data = {
            title,
            description,
            dueDate,
            status,
            priority
        };

        axios
            .post(`${apiUrl}/todos`, data)
            .then(() => {
                enqueueSnackbar("Todo Created Successfully", {variant: "success"});
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
                <h1>Create Todo</h1>
                <div className="input-form">
                    <label>Title</label>
                    <input type="text" value = {title} onChange={(event) => setTitle(event.target.value)} required/>
                </div>
                <div className="input-form">
                    <label>Description</label>
                    <textarea value = {description} onChange={(event) => setDescription(event.target.value)} required></textarea>
                </div>
                <div className="input-form">
                    <label>Finish Date</label>
                    <input type="date" value = {dueDate} onChange={(event) => setDueDate(event.target.value)} required/>
                </div>
                <div className="input-form">
                    <label>Priority</label>
                    <select className ="priority-task" value = {priority} onChange = {(event) => setPriority(event.target.value)}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <button className="save-btn" onClick={handleSaveTodo}>Save</button>
            </div>
        </div>
    )
}

export default CreateTodoModal
