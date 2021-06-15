import React from "react";
import axios from "axios";
import {AUTH_URL} from "../../constants/AxiosInstance";
import AuthContext from "../../context/AuthContext";
import ShopContext from "../../context/ShopContext";
import useShops from "./useShops";

const useProducts = (context:any) => {

    const [products, setProducts] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        setLoading(true);
        try {
            let res = await axios.get(`${AUTH_URL}shops/${context.user.id}/products`, {
                headers: {
                    access_token: context.token
                }
            });
            if (res.data === 200) {
                setProducts(res.data);
                setLoading(false);
            }
        } catch {
            setLoading(false);
        }

    }

    return {products, setProducts, getProducts, loading}
}

export default useProducts;
