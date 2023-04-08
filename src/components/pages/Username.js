import React from 'react';
import styles from '../../styles/Username.module.css';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../../assets/images/avatar.png';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { userValidate } from '../../helper/validate';
import { useAuthStore } from '../../store/store';




const Username = () => {
    const setUserName = useAuthStore(state => 
        state.setUserName)
    
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            userName: ''
        },
        validate: userValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            setUserName(values.userName)
            navigate('/password')
        },
    })
    return (
        <div className='container mx-auto'>
            <div className="flex justify-center items-center h-screen">
                <div className={styles.glass}>
                    <div className="title flex flex-col items-center">
                        <h1 className='text-5xl font-bold'>Hello Again</h1>
                        <span className='text-xl w-2/3 text-center text-gray-500 py-4'>Explore more by connecting with us</span>
                    </div>

                    <form className='py-1' onSubmit={formik.handleSubmit}>
                        <div className="flex justify-center py-4 profile">
                            <img className={styles.profile_img} src={avatar} alt="avatar" />
                        </div>
                        <div className="tex-box flex flex-col items-center gap-6">
                            <input {...formik.getFieldProps('userName')} type="text" placeholder='username'
                                className={styles.text_box}
                            />
                            <button className={styles.btn} type="submit">Let's go</button>
                        </div>
                        <div className="text-center py-4">
                            <p>Not a member <Link to="/register" className='text-red-600'>Register</Link> </p>
                        </div>

                    </form>
                </div>
            </div>
            <Toaster position='top-center'></Toaster>
        </div>
    );
};

export default Username;