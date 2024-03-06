import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTaskAsync } from './taskSlice';
import axios from 'axios';
import { fetchTasksAsync, deleteTaskAsync, updateTaskAsync } from './taskSlice';
export function Task() {
    const MY_SERVER = "http://127.0.0.1:8000";
    // const count = useSelector(selectCount);
    const dispatch = useDispatch();
    const [title, settitle] = useState("")
    const [content, setcontent] = useState("")

    const [img, setimg] = useState(null)
    const [tasks, settasks] = useState([])


    const addstudent = () => {
        const formData = new FormData();
        formData.append("title", title);

        formData.append("description", content);
        formData.append("image", img);
        console.log(formData);
        dispatch(addTaskAsync(formData))
    };
    const handleImgUpl = (files) => {
        setimg(files[0])
    }
    const loadData = async () => {
        // Fetch data from your server and update the tasks state
        const response = await axios.get(`${MY_SERVER}/get_all_images`);
        settasks(response.data);
    };
    useEffect(() => {
        loadData();
    }, []);

    // Existing useEffect for loadData
    useEffect(() => {
        dispatch(fetchTasksAsync());
    }, [dispatch]);

    const deleteTask = (taskId) => {
        dispatch(deleteTaskAsync(taskId));
    };

    const updateTask = (taskId, updatedData) => {
        // console.log(updatedData);
        dispatch(updateTaskAsync({ id: taskId, ...updatedData }));
    };



    //  fix handleDelete and handleUpdate to use the async/await pattern

    return (
        <div className="App" >

            {
                tasks.map(task => (
                    <div key={task.id} onChange={loadData}>
                        {task.title},
                        {task.description}
                        <img alt='' style={{ width: "200px" }} src={MY_SERVER + '/images/' + task.image} />
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                        <button onClick={() => updateTask(task.id, task.title, task.content)}>Update</button>
                    </div>
                ))
            }
            <div>
                <button onClick={() => addstudent()}>Add</button>
                title:<input onChange={(e) => settitle(e.target.value)} />
                content:<input onChange={(e) => setcontent(e.target.value)} />
                spic:<input type="file" onChange={(e) => handleImgUpl(e.target.files)} />
            </div>
        </div>
    );
}