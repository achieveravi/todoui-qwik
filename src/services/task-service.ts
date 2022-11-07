import axios from 'axios';
import { ITask } from '~/components/todos/todos';

const serviceRootUrl = 'http://localhost:8081/tasks';
export const getTasks = () => {
    return axios.get(serviceRootUrl);
};

export const editTask = (id: string, task: ITask) => {
    return axios.put(`${serviceRootUrl}/${id}`, task);
};

export const createTask = (task: ITask) => {
    return axios.post(serviceRootUrl, task);
};

export const deleteTask = (id: string) => {
    return axios.delete(`${serviceRootUrl}/${id}`);
};
