import axios from 'axios';

const MY_SERVER = "http://127.0.0.1:8000/";

export function addTask(formData) {
    return axios.post(MY_SERVER + "/upload_image/", formData)
}

export function fetchTasks(formData) {
    return axios.get(MY_SERVER + '/get_all_images', formData)
}

export const deleteTask = async (id) => {
    console.log(`Deleting task with ID: ${id}`);
    return await axios.delete(`${MY_SERVER}delImg/${id}/`);
};

export const updateTask = async (id, formData) => {
    console.log("Updating task with ID:", id); 
    return await axios.put(`${MY_SERVER}/updImg/${id}/`, formData);
};