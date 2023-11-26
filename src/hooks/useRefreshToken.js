import useAuth from "../hooks/useAuth";
import axios from '../api/axios';


function useRefreshToken() {

    const { setAuth } = useAuth();

    const refresh = async () => {

        const response = await axios.get("/refresh", {
            withCredentials: true
        });

        setAuth(prev => {
            
            console.log("previous auth" , JSON.stringify(prev));
            console.log("current token" , response.data.accessToken);
            return { ...prev, accessToken: response.data.accessToken }
        });

        return response.data.accessToken;
    }

    return refresh
}

export default useRefreshToken