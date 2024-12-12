import { Link } from "react-router-dom"
import { useTasks } from "../context/TaskContext"
import { Tooltip } from 'react-tooltip'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)


function TaskCard({task}) {
    const {deleteTask,doneTask} = useTasks()

  return (
    <div className="bg-zinc-800 max-w-xl w-full p-8 rounded-md">
        <header className="flex justify-between">
            <h1 className="text-lg md:text-2xl font-bold">{task.title}</h1>

            <div className="relative">
              <label className="inline-flex items-center me-5 cursor-pointer relative" data-tooltip-id="Toggle-switch"
                  data-tooltip-content={task.done ? "Done" : "No Done"}
                  data-tooltip-place="top">
                <input type="checkbox" className="sr-only peer" checked={task.done} onChange={()=> {
                  doneTask(task._id)
                  
                }}/>
                
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
              </label>
              <Tooltip id="Toggle-switch" style={{backgroundColor:"white",color:"black",fontWeight:"bold"}}/>
            </div>

            <div className="flex gap-x-2 items-center">
                <button onClick={() =>{deleteTask(task._id)}} 
                className="bg-red-500 hover:bg-red-600 text-white px-2 py-2 rounded-md">delete</button>
                <Link to={`/tasks/${task._id}`}  
                className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-2 rounded-md">edit</Link>
                
            </div>
        </header>
        <p className="text-slate-300">{task.description}</p>
        <p>{dayjs(task.date).utc().format('DD/MM/YYYY')}</p>
    </div>
  )
}

export default TaskCard
