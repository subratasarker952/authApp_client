import React, { useState } from 'react';
import styles from '../../styles/Username.module.css';
import { Link } from 'react-router-dom';
import avatar from '../../assets/images/avatar.png';
import { Toaster, toast } from 'react-hot-toast';
import { useFormik } from 'formik';
import convertToBase64 from '../../helper/convert';

import { profileValidation } from '../../helper/validate';
import { updateUser } from '../../helper/helper';
import useFetch from '../../hooks/fetch.hook';



const Profile = () => {
    
    const [{ isLoading, apiData, serverError }] = useFetch()

    const [file, setFile] = useState("")
    const formik = useFormik({
        initialValues: {
            firstName: apiData?.rest.firstName || "",
            lastName: apiData?.rest.lastName || '',
            phone: apiData?.rest.phone || '',
            userName: apiData?.rest.userName || '',
            email: apiData?.rest.email || '',
            address: apiData?.rest.address || ''
        },
        enableReinitialize: true,
        validate: profileValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            values = await Object.assign(values, { profile: file || '' })

            let updateUserPromise = updateUser(values)
          

            toast.promise(updateUserPromise, {
                loading:"Updating...!",
                success: <b>Update successful</b>, 
                error : <b>Failed to updata</b>
               })

          
        },
    })
    const onUpload = async e => {
        const base64 = await convertToBase64(e.target.files[0])
        setFile(base64)
    }
    if (isLoading) {
        return <div className='bg-white flex justify-center items-center'>
            <h1 className='text-center text-3xl h-100 '>Loading ...!</h1>
        </div>
    }
    if (serverError) {
        return <div className='bg-white flex justify-center items-center'>
            <h1 className='text-center text-3xl h-100 '>Server Error</h1>
        </div>
    }
    return (
        <div className='container mx-auto'>
            <div className="flex justify-center items-center h-screen">
                <div className={styles.glass}>
                    <div className="title flex flex-col items-center">
                        <h1 className='text-5xl font-bold  text-center'>Profile</h1>
                        <span className='text-xl w-2/3 text-center text-gray-500 py-4'>Update Your Profile</span>
                    </div>

                    <form className='py-1' onSubmit={formik.handleSubmit}>
                        <div className="flex justify-center py-4 profile">
                            <label htmlFor="image">
                                <img className={styles.profile_img} src={file || avatar} alt="avatar" />
                                <input onChange={onUpload} type="file" id='image' name="image" className='hidden' />

                            </label>
                        </div>
                        <div className="tex-box flex flex-col items-center gap-6">
                            <div className="flex gap-2">
                                <input {...formik.getFieldProps('firstName')}
                                    type="text" placeholder='Frist Name' className={styles.text_box} />
                                <input {...formik.getFieldProps('lastName')} type="text" placeholder='Last Name' className={styles.text_box} />
                            </div>
                            <div className="flex gap-2">
                                <input {...formik.getFieldProps('phone')} type="text" placeholder='Phone' className={styles.text_box} />
                                <input {...formik.getFieldProps('email')} type="email" placeholder='Email' className={styles.text_box} />
                            </div>
                            <input {...formik.getFieldProps('userName')} type="text" placeholder='User Name' className={`${styles.text_box} w-4/5`} />
                            <input {...formik.getFieldProps('address')} type="text" placeholder='address' className={`${styles.text_box} w-4/5`} />

                            <button className={styles.btn} type="submit">Update</button>
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

export default Profile;