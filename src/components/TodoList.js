import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo } from '../features/todos/todoSlice';
import TodoItem from './TodoItem';

const TodoList = () =>{
    const [input, setInput] = useState('');
    const todos = useSelector(state=>state.todos);
    const dispatch = useDispatch();

    const handleAddTodo =()=>{
        if(input.trim()){
            dispatch(addTodo(input));
            setInput('');
        };
    };

    return(
        <div>
            <input
                type="text"
                value={input}
                onChange={e=>setInput(e.target.value)} 
            />
            <button onClick={handleAddTodo}>추가</button>
            <div>
                {todos.map(todo=>(
                    <TodoItem key={todo.id} {...todo}/>
                ))}
            </div>
        </div>
    )
}

export default TodoList;