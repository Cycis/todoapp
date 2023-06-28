import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('token');

const todoApi = axios.create({
   baseURL: 'http://localhost:4000/api',
   headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
   }
});


export const getTodos = async () => {
   const response = await todoApi.get('/todo');
   return response.data;
}

export const getTodo = async (id) => {
   const response = await todoApi.get(`/todo/${id}`);
   return response.data;
}

export const addTodo = async (data) => {
   return await todoApi.post('/todo', data)
}

export const editTodo = async (data) => {
   return await todoApi.patch('/todo', data)
}

export const deleteTodo = async ({ id }) => {
   return await todoApi.delete(`/todo/${id}`, id);
}

export default todoApi;