import {useForm} from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import {useNavigate,Link} from 'react-router-dom'
import {useEffect} from 'react'

function RegisterPage() {
  const {register,handleSubmit,formState:{errors}} =  useForm()
  const {signup,isAuthenticated,errors: RegisterErrors} = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if(isAuthenticated) navigate('/tasks');

  }, [isAuthenticated])
  

  const envioUser = handleSubmit(async (values) =>{
    signup(values)
  })  

  return (
    <div className='h-[calc(100vh-100px)] flex items-center justify-center'>
      <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
        {
          RegisterErrors.map((error,i) => (
            <div className='bg-red-500 p-2 text-white text-center' key={i}>
              {error}
            </div>
          ))
        }

        <h1 className='text-3xl font-bold my-2'>Register</h1>
        <form onSubmit={envioUser} >
          <input type="text" placeholder='Username' 
              {...register("username",{required:true})} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />
          {
            errors.username && <p className='text-red-500'> Username is required</p>
          }

          <input type="email" placeholder='Email' 
              {...register("email",{required:true})} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'/>
          {
            errors.email && <p className='text-red-500'> Email is required</p>
          }


          <input type="password" placeholder='Password'
              {...register("password",{required:true})} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'/>

          {
            errors.password && <p className='text-red-500'> Password is required</p>
          }    

          <button type="submit" className='bg-sky-500 text-white px-4 py-2 rounded-md my-2 hover:bg-sky-600'>Register</button>

        </form>

        <p className='flex gap-x-2 justify-between'>Already Have an Account?  <Link to={"/login"} className=' text-sky-500'>Login</Link></p>
      </div>
    </div>  
  )
}

export default RegisterPage
