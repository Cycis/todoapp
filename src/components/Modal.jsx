import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { useMutation, queryClient } from 'react-query';
import { editTodo } from '../apis/todoApi';
import { toast } from 'react-hot-toast';

const Modal = ({ todos, setOpenModal, editId }) => {
   const todo = todos?.filter((td) => td?._id === editId);
   const [editTodos] = useState(todo[0]);
   const [text, setText] = useState(editTodos?.text);
   const [date, setDate] = useState(editTodos?.date);
   const [category, setCategory] = useState(editTodos?.status);

   const navigate = useNavigate();
   const options = [
      {
         name: 'pending'
      },
      {
         name: 'completed'
      }
   ]

   const editTodoMutation = useMutation({
      mutationFn: editTodo,
      onSuccess: () => {
         toast.success('Todo Edit Successfully')
         navigate('/')
         queryClient.invalidateQueries("todo")
      },
      onError: () => {
         toast.error('error occured while Editing!')
         queryClient.invalidateQueries("todo")
      }

   });

   const handleEditTodo = () => {
      editTodoMutation.mutate({ id: editTodos?._id, text, date })
   }

   return (
      <div className='absolute w-full h-full  flex items-center justify-center ' >
         <div className='bg-slate-900 opacity-30 top-0 bottom-0 z-[100] w-full h-full' />
         <div className='absolute bg-white w-[300px] z-[1000] rounded-md shadow-xl px-4 py-4'>
            <div className='flex items-center justify-between'>
               <h2 className='text-2xl text-slate-900'>Edit</h2>
               <FaTimes className='text-xl cursor-pointer' onClick={() => setOpenModal(prev => !prev)} />
            </div>
            <hr className='mt-1 bg-slate-900' />
            <div className='mt-10'>
               <form className='flex flex-col gap-4 items-center' onSubmit={handleEditTodo}>
                  <input type="text" className='p-1.5 w-full rounded-md outline-none outline-slate-400'
                     value={text}
                     onChange={(e) => setText(e.target.value)}
                  />
                  <select className='w-full mx-auto rounded p-1.5 text-slate-900'
                     value={category}
                     onChange={(e) => setCategory(e.target.value)}
                  >
                     {options.map((opt) => (
                        <option key={opt.name} value={opt.name}>{(opt.name)}</option>
                     ))}
                  </select>
                  <input type='date' name='date' className='p-1 rounded-md outline-none w-[150px]  outline-slate-400'
                     value={date}
                     onChange={(e) => setDate(e.target.value)}
                  />
                  <button type='submit' className='w-full py-1.5 px-4 bg-[#165777] text-white rounded-md'>Edit</button>
               </form>
            </div>
         </div>
      </div>
   )
}

export default Modal