import React, { useState } from 'react';
import styles from '../../styles/Username.module.css';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../../assets/images/avatar.png';
import { Toaster, toast } from 'react-hot-toast';
import { useFormik } from 'formik';
import convertToBase64 from '../../helper/convert';

import { validateRegisterForm } from '../../helper/validate';
import { registerUser } from '../../helper/helper';



const Register = () => {
    const navigate = useNavigate()
    const [file, setFile] = useState("")
    const formik = useFormik({
        initialValues: {
            userName: '',
            email: '',
            password: ''
        },
        validate: validateRegisterForm,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            values = await Object.assign(values, { profile: file || '' })
            let userPromise = registerUser(values)

            //    toast promise

            toast.promise(userPromise, {
                loading: "creating",
                success: <b>Register successful</b>,
                error: <b>cond not register</b>
            })
            userPromise.then(function () { navigate('/') })

        },
    })
    const onUpload = async e => {
        const base64 = await convertToBase64(e.target.files[0])
        setFile(base64)
    }
    return (
        <div className='container mx-auto'>
            <div className="flex justify-center items-center h-screen">
                <div className={styles.glass}>
                    <div className="title flex flex-col items-center">
                        <h1 className='text-5xl font-bold'>Register form</h1>
                        <span className='text-xl w-2/3 text-center text-gray-500 py-4'>Happy juarney</span>
                    </div>

                    <form className='py-1' onSubmit={formik.handleSubmit}>
                        <div className="flex justify-center py-4 profile">
                            <label htmlFor="image">
                                <img className={styles.profile_img} src={file || avatar} alt="avatar" />
                                <input onChange={onUpload} type="file" id='image' name="image" className='hidden' />

                            </label>
                        </div>
                        <div className="tex-box flex flex-col items-center gap-6">
                            <input {...formik.getFieldProps('userName')} type="text" placeholder='Display name'
                                className={styles.text_box}
                            />
                            <input {...formik.getFieldProps('email')} type="email" placeholder='Email'
                                className={styles.text_box}
                            />
                            <input {...formik.getFieldProps('password')} type="password" placeholder='Password'
                                className={styles.text_box}
                            />
                            <button className={styles.btn} type="submit">Register</button>
                        </div>
                        <div className="text-center py-4">
                            <p>Forget Password <Link to="/" className='text-red-600'>
                                Login
                            </Link> </p>
                        </div>

                    </form>
                </div>
            </div>
            <Toaster position='top-center'></Toaster>
        </div>
    );
};

export default Register;