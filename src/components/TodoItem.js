import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo } from '../features/todos/todoSlice';

const TodoItem =({id, text, completed}) =>{
    const dispatch = useDispatch();
    
    return(
        <div>
            <input
                type="checkbox"
                checked={completed}
                onChange={()=>dispatch(toggleTodo(id))}
            />
            <span style={{textDecoration: completed ? 'line-through' : 'none'}}>
                {text}
            </span>
            <button onClick={()=>dispatch(deleteTodo(id))}>삭제</button>
        </div>
    )
}

export default TodoItem;