import {useEffect} from 'react'
import { useTasks } from "../context/TaskContext"
import TaskCard from '../components/TaskCard';
import { useAuth } from '../context/AuthContext';


function TasksPage() {
  const {getTasks,tasks} = useTasks();
  const {user,isAuthenticated} = useAuth()

  useEffect(() => {
    getTasks()
    
  }, [])
  
  return (
    <>
      <h2 className='text-center'>Welcome {user.username.toUpperCase()} {
        isAuthenticated ? (<h3 className="font-bold text-sm sm:text-md md:text-2xl">You have 
          {" "}{tasks.length === 0 ? "no" : tasks.length} Pending Tasks</h3>) 
        :
         (null)
      }</h2>
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-2'>
        {
          tasks.map((task) =>(
            <TaskCard task={task} key={task._id}></TaskCard>
          ))
        }
        
      </div>
    </>
    
  )
}

export default TasksPage
