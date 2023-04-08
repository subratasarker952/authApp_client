import { toast } from "react-hot-toast";
import { authenticate } from "./helper";


export async function userValidate(values) {
    const error = userVerify({}, values)

    if (values.userName) {
        const { status } = await authenticate(values.userName)
        if(status!==200){
            error.exist= toast.error("User does not exist")
        }else{
            return
        }
    }
    return error
}

function userVerify(error = {}, values) {
    if (!values.userName) {
        error.userName = toast.error("Username required")
    } else if (values.userName.includes(' ')) {
        error.userName = toast.error("Invalid Username")
    }
    return error;
}


export async function passwordValidate(values) {
    const error = passwordVerify({}, values)
    return error
}

function passwordVerify(error = {}, values) {
    const specialCharacter = /[-!$%^&*()_+|~=`{}[\]:/;<>?,.@#]/;
    if (!values.password) {
        error.password = toast.error("Password required")
    } else if (values.password.length < 8) {
        error.password = toast.error("Minimum 8 char")
    } else if (values.password.includes(' ')) {
        error.password = toast.error("Invalid Password")
    } else if (!specialCharacter.test(values.password)) {
        error.password = toast.error("Please Provide a special character")
    }
    return error;
}

export async function validateRegisterForm(values) {
    const errors = userVerify({}, values)
    passwordVerify(errors, values)
    emailVerify(errors, values)
    return errors
}

function emailVerify(error = {}, values) {
    if (!values.email) {
        error.email = toast.error("email required")
    } else if (values.email.includes(' ')) {
        error.email = toast.error("Invalid email")
    }
    return error;
}


export async function resetPasswordValidate(values) {
    const error = resetPasswordVerify({}, values)
    return error
}
function resetPasswordVerify(error = {}, values) {
    const specialCharacter = /[-!$%^&*()_+|~=`{}[\]:/;<>?,.@#]/;
    if (!values.password || !values.confirmpassword) {
        error.iserror = toast.error("password are required")
    }
    else if (values.password !== values.confirmpassword) {
        error.iserror = toast.error("password miss match")
    }
    else if ((values.password.length < 4)) {
        error.iserror = toast.error("minimum 4 char")
    }
    else if (values.password.includes(' ')) {
        error.iserror = toast.error("Space not allow")
    }
    else if ((!specialCharacter.test(values.password))) {
        error.iserror = toast.error("Please Provide a special character")
    }
    return error;
}

export async function profileValidation(values) {
    const error = emailVerify({}, values)
    return error
}