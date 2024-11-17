import React from 'react'
import {Routes, Route} from "react-router-dom"
import TodoList from './pages/TodoList'

const App = () => {
    return (
        <Routes>
            <Route path = "/" element = {<TodoList/>}/>
        </Routes>
    )
}

export default App
