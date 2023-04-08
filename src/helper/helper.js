import axios from 'axios';
import jwt_decode from 'jwt-decode';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN

export async function authenticate(userName) {
    try {
        return await axios.post("/api/authenticate", { userName })
    } catch (error) {
        return { error: "User name does not exist" }
    }
}

export async function registerUser(credentials) {
    try {
        const { data: { msg }, status } = await axios.post("/api/register", credentials)
        let { email, userName } = credentials
    
        // if (status === 201) {
        //     await axios.post('/api/registerMail', { userName, userEmail: email, text: msg })
        //     return Promise.resolve(msg)
        //     // return {msg}
        // }
    } catch (error) {

        return Promise.reject({ error })
        // return { error }

    }
}
export async function getUser({ userName }) {
    try {
        const { data } = await axios.get(`/api/user/${userName}`)
        return { data }
    } catch (error) {
        return { error: "Password don't match" }
    }
}

export async function verifyPassword({ userName, password }) {
    try {
        if (userName) {
            const { data } = await axios.post("/api/login", { userName, password })

            return Promise.resolve({ data })
            // return { data }
        }
    } catch (error) {
        return Promise.reject({ error: "password do not match" })
        // return ({ error: "password do not match" })
    }
}

export async function updateUser(response) {
    try {
        const token = await localStorage.getItem("token")
        const data = await axios.put('/api/updateuser', response, { headers: { "Authorization": `Bearer ${token}` } })
        return Promise.resolve({ data })
        // return ({data})
    } catch (error) {
        return Promise.reject({ error: "Could not update profile" })
        // return ({ error: "Could not update profile" })
    }
}

export async function generateOTP(userName) {
    try {
        const { data: { code }, status } = await axios.get("/api/generateOTP", { params: { userName } })
        // if (status === 201) {
        // let { data: { email } } = await getUser({ userName })
        // let text = `Your recovery OTP is ${code}`
        // await axios.post('/api/registerMail', { userName, userEmail: email, text, subject: "password recovery otp" })
        // }
        return Promise.resolve(code)
    } catch (error) {
        return Promise.reject({ error: "Could not generate" })

    }
}


export async function verifyOTP({ userName, code }) {
    try {
        const { data, status } = await axios.get("/api/verifyOTP", { params: { userName, code } })
    
        return { data, status }
    } catch (error) {
        return Promise.reject({ error: "Could not verify otp" })

    }
}

export async function resetPassword({ userName, password }) {
    try {
        const { data, status } = await axios.put("/api/resetpassword", { userName, password })
        return Promise.resolve({ data, status })
    } catch (error) {
        return Promise.reject({ error })

    }
}

export async function getUserFromLocalhost() {
    const token = localStorage.getItem('token')
    if (!token) return ({error:"Can not find token"})
    const decode = jwt_decode(token)
    return decode
}
