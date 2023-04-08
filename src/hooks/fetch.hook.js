import axios from 'axios';
import { useEffect, useState } from 'react';
import { getUserFromLocalhost } from '../helper/helper';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN

export default function useFetch(query) {

    const [getData, setData] = useState({
        isLoading: false, apiData: undefined, status: null, serverError: null
    })

    useEffect(() => {

        const fetchData = async () => {
            try {
                setData((prev) => ({ ...prev, isLoading: true }))
                const { userName } = await getUserFromLocalhost();

                const { data, status } = !query ? await axios.get(`/api/user/${userName}`) : await axios.get(`/api/${query}`);




                if (status === 201) {
                    setData((prev) => ({ ...prev, isLoading: false }))
                    setData((prev) => ({ ...prev, apiData: data, status: status }))

                }
                setData((prev) => ({ ...prev, isLoading: false, serverError: false }))


            } catch (error) {
                setData((prev) => ({ ...prev, isLoading: false, serverError: error }))
            }
        }
        fetchData()

    }, [query])

    return [getData, setData]
}
