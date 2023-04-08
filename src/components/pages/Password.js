import React from 'react';
import styles from '../../styles/Username.module.css';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../../assets/images/avatar.png';
import { Toaster, toast } from 'react-hot-toast';
import { useFormik } from 'formik';
import { useAuthStore } from '../../store/store';
import { passwordValidate } from '../../helper/validate';
import useFetch from '../../hooks/fetch.hook';
import { verifyPassword } from '../../helper/helper';



const Password = () => {
    const navigate = useNavigate()
    const { userName } = useAuthStore(state => state.auth)

    const [{ isLoading, apiData, serverError }] = useFetch(`user/${userName}`)


    const formik = useFormik({
        initialValues: {
            password: ''
        },
        validate: passwordValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            let passwordPromise = verifyPassword({ userName, password: values.password })


            toast.promise(passwordPromise, {
                loading: "checking...!",
                success: <b>Login successful</b>,
                error: <b>Password not match</b>
            })
            passwordPromise.then(res => {
                let { token } = res.data
                localStorage.setItem('token', token)
                navigate('/profile')
            })
        },

    })
    if (isLoading) {
        return <h1 className='text-center text-3xl h-100 '>Loading ...!</h1>

    }
    if (serverError) {
        return <h1 className='text-center text-3xl h-100 '>Server Error</h1>
    }
    return (
        <div className='container mx-auto'>
            <div className="flex justify-center items-center h-screen">
                <div className={styles.glass}>
                    <div className="title flex flex-col items-center">
                        <h1 className='text-5xl font-bold'>Hello
                            {apiData?.rest.firstName || apiData?.rest.userName || ""}
                        </h1>
                        <span className='text-xl w-2/3 text-center text-gray-500 py-4'>Give Password</span>
                    </div>

                    <form className='py-1' onSubmit={formik.handleSubmit}>
                        <div className="flex justify-center py-4 profile">
                            <img className={styles.profile_img} src={avatar} alt="avatar" />
                        </div>
                        <div className="tex-box flex flex-col items-center gap-6">
                            <input {...formik.getFieldProps('password')} type="password" placeholder='Password'
                                className={styles.text_box}
                            />
                            <button className={styles.btn} type="submit">Login</button>
                        </div>

                    </form>
                    <div className="text-center py-4">
                        <p>Forget Password <Link to="/recovery" className='text-red-600'>
                            Recovery
                        </Link> </p>
                    </div>
                </div>
            </div>
            <Toaster position='top-center'></Toaster>
        </div>
    );
};

export default Password;