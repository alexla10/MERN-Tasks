import {useForm} from 'react-hook-form'
import { useTasks } from '../context/TaskContext'
import { useNavigate,useParams } from 'react-router-dom'
import {useEffect,useState} from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useAuth } from '../context/AuthContext'
dayjs.extend(utc)

function TaskFormPage() {
  const {register,handleSubmit,setValue} =  useForm()
  const {user} = useAuth()
  const {createTask,getTask,updateTask} = useTasks()
  const navigate = useNavigate()
  const params = useParams()
  const [loading, setLoading] = useState(true);

  const envioTarea = handleSubmit(async (data) =>{
    const dateValid = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format()
    }

    if(params.id){
      updateTask(params.id,dateValid)
    }else{
        createTask(dateValid)
      
    }
    navigate("/tasks")
  })  

  useEffect(() => {
    async function loadTask() {
      if(params.id){
        try {
          const task = await getTask(params.id)
          if( !task || task.user._id != user.id){
            navigate("/tasks")
            return;
          }
          setValue('title',task.title)
          setValue('description',task.description)
          setValue("date",dayjs.utc(task.date).format('YYYY-MM-DD'))
          setLoading(false);
        } catch (error) {
          console.error("Error cargando la tarea:", error);
          navigate('/tasks'); 
        }
      }
    }

    loadTask()
  }, [])
  

  return (
    <div className='h-[calc(100vh-100px)] flex items-center justify-center'>
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
        
        <form onSubmit={envioTarea}>
          <label htmlFor="title">Title</label>
          <input type="text" placeholder="Title" 
            {...register("title")}
            autoFocus
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          />

          <label htmlFor="description">Description</label>
          <textarea rows="3" placeholder="Description"
            {...register("description")}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          ></textarea>

          <label htmlFor="date">Date</label>
          <input type="date" {...register("date")}  className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'/>

          <button className='bg-indigo-500 px-3 py-2 rounded-md hover:bg-indigo-600'>Save</button>

        </form>
      </div>
    </div>  
  )
}

export default TaskFormPage
