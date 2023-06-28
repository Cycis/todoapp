import React from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { toTextCase } from '../utils/helper';
import { toast } from 'react-hot-toast';
import { deleteTodo } from '../apis/todoApi';


const TodoItem = ({ todo, setOpenModal, setEditId, setEditTodo }) => {
   const queryClient = useQueryClient();


   const deleteTodoMutation = useMutation({
      mutationFn: deleteTodo,
      onSuccess: () => {
         toast.success('Todo Deleted Successfully')
         queryClient.invalidateQueries("todo")
      },
      onError: () => {
         toast.error('error occured while adding!')
         queryClient.invalidateQueries("todo")
      }

   });

   return (
      <article className='bg-slate-200 rounded-md flex items-center justify-between p-2'>
         <div className='flex gap-2'>
            <input type='checkbox' name="" id="" />
            <p>{toTextCase(todo?.text)}</p>
         </div>
         <div className='flex gap-2'>
            <button className='text-[#226c91]'>
               <FiEdit onClick={() => {
                  setEditId(todo?._id)
                  setOpenModal(prev => !prev)
               }} />
            </button>
            <button className='text-red-400'>
               <FiTrash onClick={() => deleteTodoMutation.mutate({ id: todo?._id })} />
            </button>
         </div>
      </article>
   )
}

export default TodoItem