import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios'


const Register = () => {
   const { register, handleSubmit } = useForm();
   const navigate = useNavigate()

   const onSubmit = async (data) => {
      if (data.password !== data.confirmPassword) {
         toast.error('password does not match')
      } else {
         const userData = {
            username: data.username,
            password: data.password
         }
         const response = await axios.post(`http://localhost:4000/api/auth/register`, userData)
         if (response) {
            toast.success('Registration Successfully')
            navigate('/login')
         }
      }
   }
   return (
      <div className='self-center justify-self-center w-full md:w-1/3 bg-slate-300 rounded-md shadow-sm py-6'>
         <h2 className='ml-14 mb-4 py-2 text-4xl'>Register</h2>

         <div className=''>
            <form className='space-y-3 ml-14 mb-2' onSubmit={handleSubmit(onSubmit)}>
               <div className='flex flex-col'>
                  <label className='mb-2'>Username</label>
                  <input type="text" className='p-1.5 w-10/12 rounded-sm text-gray-800' {...register('username')} />
               </div>
               <div className='flex flex-col'>
                  <label className='mb-2'>Password</label>
                  <input type="text" className='p-1.5 w-10/12 rounded-sm text-gray-800' {...register('password')} />
               </div>
               <div className='flex flex-col'>
                  <label className='mb-2'>Confirm Password</label>
                  <input type="text" className='p-1.5 w-10/12 rounded-sm text-gray-800' {...register('confirmPassword')} />
               </div>
               <button className=' bg-[#023047]  w-10/12 text-white py-3 '>Register</button>
            </form>
            <span className='text-sm ml-24 text-slate-800'>
               Don't have an account
               <Link to='/register' className='text-[#023047]'>SignIn</Link>
            </span>
         </div>
      </div>
   )
}

export default Register