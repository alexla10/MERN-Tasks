import {createContext,useState,useContext,useEffect} from 'react'
import { loginRequest, registerRequest,verifyTokenRequest} from '../api/auth'
import Cookies from 'js-cookie'

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

export const AuthProvider = ({children}) => {
    const [user, setuser] = useState(null)
    const [isAuthenticated, setisAuthenticated] = useState(false)
    const [errors, seterrors] = useState([])
    const [loading, setloading] = useState(true)

    const signup = async (user) => {
        try {
            const res = await registerRequest(user)
            console.log(res.data)
            setuser(res.data)
            setisAuthenticated(true)
        } catch (error) {
            seterrors(error.response.data)
        }
    }

    const signin = async (user) => {
        try {
            const res = await loginRequest(user)
            console.log(res)
            setuser(res.data)
            setisAuthenticated(true)
        } catch (error) {
            if(Array.isArray(error.response.data)){
                return seterrors(error.response.data)
            }
            seterrors([error.response.data.message])
        }
    }

    const logout = () => {
        Cookies.remove("token");
        setisAuthenticated(false)
        setuser(null)
    }

    useEffect(() => {
      if(errors.length > 0){
        const timer = setTimeout(() =>{
            seterrors([])
        },5000)
        return () => clearTimeout(timer)
      }
    
    }, [errors])

    useEffect(() => {
        const checkLogin = async () => {
            const cookies = Cookies.get()
            if(!cookies.token){
                setisAuthenticated(false)
                setloading(false)
                return setuser(null)
            }
            
            try {
                const res = await verifyTokenRequest(cookies.token)
                if(!res.data) return setisAuthenticated(false); 

                setisAuthenticated(true)
                setuser(res.data)
                setloading(false)
            } catch (error) {
                console.log(error)
                setisAuthenticated(false)
                setuser(null)
            }    
            
        }

        checkLogin();
      
    }, [])
    
    
    

    return(
        <AuthContext.Provider value={{signup,user,isAuthenticated,errors,signin,loading,logout}}>
            {children}
        </AuthContext.Provider>
    )
}