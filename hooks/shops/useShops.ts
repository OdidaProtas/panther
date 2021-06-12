import React from "react";
import axios from "axios";
import {AUTH_URL} from "../../constants/AxiosInstance";

const useShops = (id: number, token: string) => {

    const [shops, setShops] = React.useState({});
    const [errors, setErrors] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        getShops();

    }, [])

    async function getShops() {
        setLoading(true);

        try{

            let res = await axios.get(`${AUTH_URL}user/${id}/shops/`, {
                headers: {
                    access_token: token
                }
            });

            if (res.status === 200) {
                setLoading(false);
                setShops(res.data);

            } else {
                setErrors(true);
                setLoading(false);
            }

        }catch (e) {
            console.log(e);
            setLoading(false);
            setErrors(true);
        }

    }

    async function refresh() {
        getShops();
    }


    return {shops, setShops, errors, loading, refresh};

}

export default useShops;
