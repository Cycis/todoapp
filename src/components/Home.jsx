import React from 'react';
import Modal from './Modal';
import { useState, useEffect } from 'react';
import { useQueryClient, useQuery, useMutation } from 'react-query';
import { addTodo, getTodos } from '../apis/todoApi';
import TodoItem from './TodoItem';
import toast from 'react-hot-toast';
import { formatDate, toTextCase } from '../utils/helper';


const Home = () => {

   const options = [
      {
         name: 'all'
      },
      {
         name: 'pending'
      },
      {
         name: 'completed'
      }
   ]

   const [openModal, setOpenModal] = useState(false);
   const [todos, setTodos] = useState([]);
   const [editTodo, setEditTodo] = useState({})
   const [text, setText] = useState('');
   const [date, setDate] = useState(null);
   const [editId, setEditId] = useState('');
   const [category, setCategory] = useState('all');
   const [filteredTodos, setFilteredTodos] = useState([]);

   const queryClient = useQueryClient();
   const today = new Date().setHours(0, 0, 0, 0);

   const { isLoading, isError, error, data } = useQuery('todo', getTodos,
      { select: data => data.sort((a, b) => b - a) }
   )

   useEffect(() => {
      setTodos(data)
   }, [data])

   const changeCat = (string) => {
      setCategory(string)
   }

   useEffect(() => {
      if (category === 'all') {
         setFilteredTodos(todos)
      } else if (category === 'pending') {
         const pendingTodos = todos?.filter(todo => todo?.status === category);
         setFilteredTodos(pendingTodos)
      } else if (category === 'completed') {
         const completedTodo = todos?.filter(todo => todo?.status === category);
         setFilteredTodos(completedTodo)
      } else if (category === 'today') {
         const todayTodo = todos?.filter(todo => formatDate(todo?.date) === formatDate(today) && todo?.status === 'pending');
         setFilteredTodos(todayTodo)
      } else if (category === 'overdue') {
         const overdueTodo = todos?.filter(todo => formatDate(todo?.date) < formatDate(today));
         setFilteredTodos(overdueTodo)
      } else if (category === 'schedule') {
         const scheduleTodo = todos?.filter(todo => formatDate(todo?.date) > formatDate(today));
         setFilteredTodos(scheduleTodo)
      }

   }, [category, todos, today])

   const addTodoMutation = useMutation({
      mutationFn: addTodo,
      onSuccess: () => {
         toast.success('Todo Added Successfully')
         queryClient.invalidateQueries("todo")
      },
      onError: () => {
         toast.error('error occured while adding!')
         queryClient.invalidateQueries("todo")
      }

   });

   const handleTodo = (e) => {
      e.preventDefault()
      addTodoMutation.mutateAsync({ text, date, status: 'pending' })
   }

   return (
      <>
         <div className=' w-full lg:w-[40%] mx-auto bg-[#2779a2] shadow-xl rounded-md '>
            {
               isLoading
                  ? (<h1 className='text-4xl font-bold text-center text-white mt-4 mb-10'>Loading...</h1>)
                  : isError ? (<h2>{error}</h2>) :
                     (
                        <div>
                           <h2 className='text-4xl font-bold text-center text-white mt-4 mb-10'>{`Welcome`}</h2>
                           {/*  */}
                           <div className='flex gap-4 px-2 py-3 ml-1 w-full'>
                              <form className='w-full flex gap-3 items-center' onSubmit={handleTodo}>
                                 <input type="text" className='p-1.5 rounded-md outline-none w-1/2 bg-slate-200' value={text} onChange={(e) => setText(e.target.value)} />
                                 <input type="date" name='date' className='p-1 rounded-md outline-none w-[150px] bg-slate-200' onChange={(e) => setDate(e.target.value)} />
                                 <button className='py-1.5 px-4 bg-[#165777] text-white rounded-md'>Add</button>
                              </form>
                           </div>
                           <div className='flex md:hidden mb-3 '>
                              <select className='w-2/5 mx-auto rounded p-1.5 text-slate-800 bg-slate-200'
                                 onChange={(e) => setCategory(e.target.value)}
                              >
                                 {options.map(opt => (
                                    <option key={opt.name} value={opt.name} onClick={() => changeCat(opt.name)}  >{toTextCase(opt.name)}</option>
                                 ))}
                              </select>
                           </div>

                           <div className='flex items-center justify-center gap-2'>
                              <div className='hidden md:flex w-[30%] pt-2 px-2 bg-slate-100 h-fit pb-5 flex-col justify-start items-center gap-2'>
                                 {options.map(opt => (
                                    <button key={opt.name} onClick={() => changeCat(opt.name)} className='w-full px-3 py-1 text-white bg-[#226c91] rounded-md'>{opt.name.toLocaleUpperCase()}</button>
                                 ))}
                                 <button className='w-full px-3 py-1 text-white bg-[#226c91] rounded-md uppercase' onClick={() => changeCat('today')}>Today</button>
                                 <button className='w-full px-3 py-1 text-white bg-[#226c91] rounded-md uppercase' onClick={() => changeCat('overdue')}>overdue</button>
                                 <button className='w-full px-3 py-1 text-white bg-[#226c91] rounded-md uppercase' onClick={() => changeCat('schedule')}>schedule</button>
                              </div>
                              <div className='scroll_bar w-[100%] sm:w-[70%] p-1.5 h-[200px] flex flex-col space-y-2 overflow-hidden hover:overflow-y-scroll'>
                                 {filteredTodos?.length > 0 ? (
                                    filteredTodos && filteredTodos?.map((todo) => (
                                       <TodoItem key={todo._id} todo={todo} setOpenModal={setOpenModal} setEditId={setEditId} setEditTodo={setEditTodo} />
                                    ))
                                 ) :
                                    <h2 className='text-center text-white text-3xl self-center'>No Todos</h2>
                                 }
                              </div>
                           </div>
                        </div>
                     )
            }
         </div>
         {openModal && <Modal setOpenModal={setOpenModal} todos={todos} editId={editId} editTodo={editTodo} />}
      </>
   )
}

export default Home