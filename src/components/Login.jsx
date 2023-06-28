import React, { } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios'
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

const Login = () => {
   const { register, handleSubmit } = useForm();
   const navigate = useNavigate()

   const onSubmit = async (data) => {
      try {
         const user = {
            username: data.username,
            password: data.password
         }
         const { data: userData } = await axios.post(`http://localhost:4000/api/auth/login`, user)
         localStorage.setItem('token', userData?.token);
         Cookies.set('token', userData?.token, { expires: 1 })

         toast.success('loggedIn Successfully')
         navigate('/')
      } catch (err) {
         toast.error('Incorrect Credientails')
      }
   }

   return (
      <div className='self-center justify-self-center w-full md:w-1/3 bg-slate-300 rounded-md shadow-sm py-6'>
         <h2 className='ml-14 mb-4 py-2 text-4xl'>Login</h2>

         <div className=''>
            <form className='space-y-3 ml-14 mb-2' onSubmit={handleSubmit(onSubmit)}>
               <div className='flex flex-col'>
                  <label className='mb-2'>Username</label>
                  <input type="text" autoComplete="off" className='p-2 w-10/12 rounded-sm text-gray-800' {...register('username')} />
               </div>
               <div className='flex flex-col'>
                  <label className='mb-2'>Password</label>
                  <input type="password" autoComplete="off" className='p-2 w-10/12 rounded-sm text-gray-800' {...register('password')} />
               </div>
               <button className=' bg-[#023047]  w-10/12 text-white py-3 rounded-sm'>Login</button>
            </form>
            <span className='text-sm ml-12 text-slate-800'>Don't have an account <Link to='/register' className='text-[#023047]'>Register</Link> </span>
         </div>
      </div>
   )
}

export default Login