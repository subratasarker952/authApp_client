import { Navigate } from "react-router-dom"
import { useAuthStore } from "../store/store"
import { toast } from 'react-hot-toast';


export const AuthorizeUser = ({ children }) => {
    const token = localStorage.getItem("token")
    if (!token) {
        return <Navigate to={'/'} replace={true}></Navigate>
    }
    return children
}

export const AuthorizeUserName = ({ children }) => {
    // <Toaster/>

    const { userName } = useAuthStore(state => state.auth)
    if (!userName) {
        toast.error("User name Required")
        return <Navigate to={'/'} replace={true}></Navigate>
    }
    return children
}