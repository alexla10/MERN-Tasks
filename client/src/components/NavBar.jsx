import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useTasks } from "../context/TaskContext"


function NavBar() {
    const {isAuthenticated,logout} = useAuth()
    const {setTasks} = useTasks()

    const limpiar = () => {
        setTasks([])
        logout()
    }

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-3 px-3 rounded-lg sm:px-10 items-center">
      <Link to={isAuthenticated ? '/tasks' : '/'}>
        <h1 className="text-sm sm:text-md md:text-2xl font-bold text-white">Task Manager</h1>
      </Link>

      <ul className="flex gap-x-2">
        {
            isAuthenticated ? (
                <>
                    <li>
                        <Link to={'/add-task'} className="bg-indigo-500 px-3 py-1 rounded-sm text-center block hover:bg-indigo-600">Add Task</Link>
                    </li>

                    <li>
                        <Link to={'/'} onClick={() => limpiar()} className="bg-emerald-400 px-3 py-1 rounded-sm text-center block hover:bg-emerald-500">Logout</Link>
                    </li>
                </>
            ) : (
                <>
                    <li>
                        <Link to={'/login'} className="bg-indigo-500 px-3 py-1 rounded-sm hover:bg-indigo-600">Login</Link>
                    </li>

                    <li>
                        <Link to={'/register'} className="bg-emerald-400 px-3 py-1 rounded-sm hover:bg-emerald-500">Register</Link>
                    </li>
                </>
            )
        }
      </ul>
    </nav>
  )
}

export default NavBar
