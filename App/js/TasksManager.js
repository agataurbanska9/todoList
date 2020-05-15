import React, {useEffect, useState} from 'react';
import {AddTask} from "./AddTask";
import '../css/style.css'
import {FaTrash} from 'react-icons/fa';

export const TasksManager = () => {
    const API_URL = 'http://localhost:3000';

    const [tasks, setTasks] = useState(false)

    useEffect(() => {
        fetch(`${API_URL}/tasks`)
            .then(resp => resp.json())
            .then(data => setTasks(data))
            .catch(err => console.log(err));
    }, [])


    const handleRemoveClick = (e, taskId) => {
        e.preventDefault();
        fetch(`${API_URL}/tasks/${taskId}`, {
            method: 'DELETE'
        })
            .then(data => {
                const newTasksArr = tasks.filter(task => task.id !== taskId);
                setTasks(newTasksArr);
            })
            .catch(err => {
                console.log(err)
            })
    }

    const addTask = (task) => {
        setTasks(prev => [...prev, task]);
    }

    if (!tasks) return <h1>Loading data ...</h1>

    return (
        <>
            <div className={'container'}>
                <h1 className={'page-title'}>Organize yourself</h1>
            </div>
            <AddTask onAddTask={addTask}/>
            <section className={'container'}>
            <h3 className={'tasks-title'}>Tasks to do:</h3>
            <ul className={'tasks-list'}>
                {tasks.map(task => <li key={task.id}>
                    {task.title} - {task.description}, {task.date.start}-{task.date.end}
                    <button onClick={e => handleRemoveClick(e, task.id)} className={'remove-btn'}><FaTrash className={'trash-icon'}/></button>
                </li>)}
            </ul>
            </section>
        </>
    )

}