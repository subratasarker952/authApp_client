import React, { useState } from 'react';
import styles from '../../styles/Username.module.css';
// import { Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { useFormik } from 'formik';
import { resetPasswordValidate } from '../../helper/validate';
import { resetPassword } from '../../helper/helper';
import { useAuthStore } from '../../store/store';
import useFetch from '../../hooks/fetch.hook';
import { useNavigate } from 'react-router-dom';



const Reset = () => {
    const navigate = useNavigate()

    const [{ isLoading, status, serverError }] = useFetch('createResetSession')


    const { userName } = useAuthStore(state => state.auth)

    const [checked, setChecked] = useState(false)
    // let type = "password"
    // if (checked) {
    //     type = "text"
    // }

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmassword: '',

        },
        validate: resetPasswordValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            let resetPromise = resetPassword({ userName, password: values.password })

            toast.promise(resetPromise, {
                loading: "Password Updating..!",
                success: "Password reset Successful!",
                error: "SomeThing Went wrong"
            })
            return navigate("/password")

        },
    })

    if (isLoading) {
        return <h1 className='text-center text-3xl h-100 '>Loading ...!</h1>

    }
    if (serverError) {
        return <h1 className='text-center text-3xl h-100 '>Server Error</h1>
    }
    // if (status && status !== 201) {
    //     return <Navigate to={'/'} replace={true}></Navigate>
    // }
    return (
        <div className='container mx-auto'>
            <div className="flex justify-center items-center h-screen">
                <div className={styles.glass}>
                    <div className="title flex flex-col items-center">
                        <h1 className='text-5xl font-bold'>Reset</h1>
                        <span className='text-xl w-2/3 text-center text-gray-500 py-4'> Set new Password</span>
                    </div>

                    <form className='py-1' onSubmit={formik.handleSubmit}>

                        <div className="tex-box flex flex-col items-center gap-6">
                            <input {...formik.getFieldProps('password')} type={checked ? "text" : "password"} placeholder='New Password'
                                className={styles.text_box}
                            />
                            <input {...formik.getFieldProps('confirmpassword')} type={checked ? "text" : "password"} placeholder='Repeat Password'
                                className={styles.text_box}
                            />
                            <label onClick={() => setChecked(!checked)} htmlFor="checkbox">
                                <input type="checkbox" name="" id="chekbox" />
                                <span className={styles.mr3}>Show Password</span>
                            </label>
                            <button className={styles.btn} type="submit">Submit</button>
                        </div>

                    </form>
                </div>
            </div>
            <Toaster position='top-center'></Toaster>
        </div>
    );
};

export default Reset;