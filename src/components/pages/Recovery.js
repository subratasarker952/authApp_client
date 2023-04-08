import React, { useState } from 'react';
import styles from '../../styles/Username.module.css';
import avatar from '../../assets/images/avatar.png';
import { Toaster, toast } from 'react-hot-toast';
import { useAuthStore } from '../../store/store';
import { generateOTP, verifyOTP } from '../../helper/helper';
import { useNavigate } from 'react-router-dom';


// import { passwordValidate } from '../../helper/validate';



const Recovery = () => {
    const navigate = useNavigate()
    const { userName } = useAuthStore(state => state.auth)
    const [OTP, setOTP] = useState()

    const sendOtp = async () => {
        const otp = await generateOTP(userName)
        console.log(otp)
    }

    const onsubmit = async (e) => {
        e.preventDefault()
        try {
            const { status } = await verifyOTP({ userName, code: OTP })
            if (status === 200) {
                toast.success("veryfy successfully")
                return navigate("/reset")
            }
        } catch (error) {
            return toast.error("wrong otp please check")

        }

    }


    return (
        <div className='container mx-auto'>
            <div className="flex justify-center items-center h-screen">
                <div className={styles.glass}>
                    <div className="title flex flex-col items-center">
                        <h1 className='text-5xl font-bold'>Recovery</h1>
                        <span className='text-xl w-2/3 text-center text-gray-500 py-4'>Enter OTP to generate Password</span>
                    </div>

                    <form onSubmit={onsubmit} className='py-1'>
                        <div className="flex justify-center py-4 profile">
                            <img className={styles.profile_img} src={avatar} alt="avatar" />
                        </div>
                        <div className="tex-box flex flex-col items-center gap-6">
                            <p> Enter 6 digit otp</p>
                            <input onChange={(e) => setOTP(e.target.value)}
                                maxLength={6} type="text" placeholder='OTP'
                                className={styles.text_box}
                            />
                            <button className={styles.btn} type="submit">Genarate Password</button>
                        </div>
                    </form>
                    <div className="text-center py-4">
                        <p>Can't get OTP <button
                            onClick={sendOtp}

                            className='text-red-600'>
                            Create OTP
                        </button> </p>
                    </div>
                </div>
            </div>
            <Toaster position='top-center'></Toaster>
        </div>
    );
};

export default Recovery;