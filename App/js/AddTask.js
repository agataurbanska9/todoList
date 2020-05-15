import React, {useState} from 'react';

export const AddTask = ({onAddTask}) => {

    const API_URL = 'http://localhost:3000';
    const [task, setTask] = useState({
        title: "",
        description: "",
        start: "",
        end: ""
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setTask(prev=> ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const dataToSend = {
            title: task.title,
            description: task.description,
            date: {
                start: task.start,
                end: task.end
            }
        }

        fetch(`${API_URL}/tasks`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        })
            .then( resp => resp.json())
            .then( task => {
                if( typeof onAddTask === 'function'){
                    onAddTask(task);
                }

                setTask({
                    title: "",
                    description: "",
                    start: "",
                    end: ""
                });

            })
            .catch( err => console.log(err))

    }

    return (
        <form onSubmit={handleSubmit} className={'form container'}>
            <input name="title"
                   placeholder={"title"}
                   value={task.title}
                   onChange={ handleChange }/>
            <input name="description"
                   placeholder={"description"}
                   value={task.description}
                   onChange={ handleChange }
            />
            <input name="start"
                   placeholder={"start"}
                   value={task.start}
                   onChange={ handleChange }
            />
            <input name="end"
                   placeholder={"end"}
                   value={task.end}
                   onChange={ handleChange }
            />
            <input type={"submit"} className={'submit-btn'}/>
        </form>
    )
}