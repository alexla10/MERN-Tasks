import {createContext,useContext,useState} from 'react'
import { createTaskRequest, deleteTaskRequest, doneTaskRequest, getTaskRequest, getTasksRequest, updateTaskRequest } from '../api/task'

export const TaskContext = createContext()

export const useTasks = () => {
    const context = useContext(TaskContext)
    if(!context){
        throw new Error("useATask must be used within an TaskProvider")
    }
    return context
}

export function TaskProvider({children}){
    const [tasks, setTasks] = useState([])

    const getTasks = async () => {
        try {
            const res = await getTasksRequest()
            console.log("las tareas son estas: ",res.data)
            setTasks(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const createTask = async (task) => {
        try {
            const res = await createTaskRequest(task)
            console.log(res)
            setTasks(prevTasks => [...prevTasks, res.data]);
        } catch (error) {
            console.log(error)
        }        
    }

    const deleteTask = async (id) => {
        try {
            const res = await deleteTaskRequest(id)
            if(res.status == 204) setTasks(tasks.filter(task => task._id != id))
        } catch (error) {
            console.log(error)
        }
    }

    const getTask = async (id) => {
        try {
            const res = await getTaskRequest(id)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const updateTask = async (id,task) => {
        try {
            await updateTaskRequest(id,task)
        } catch (error) {
            console.log(error)
        }
    }

    const doneTask = async (id) => {
        try {
            const taskFound = tasks.find((task) => task._id == id)
            await doneTaskRequest(id,taskFound.done == false ? true : false)
            setTasks(tasks.map((task) => task._id == id ? {...task, done : !task.done} : task))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <TaskContext.Provider value={{tasks,createTask,getTasks,deleteTask,getTask,updateTask,setTasks,doneTask}}>
            {children}
        </TaskContext.Provider>
    )

   
}