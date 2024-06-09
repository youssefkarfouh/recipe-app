import { axiosBackend } from "../api/axios"
import { I_AuthState } from "../interfaces/authContext";

export const login = async (credentials: { user: string, pwd: string }) : Promise<I_AuthState> => {

    const response = await axiosBackend.post('/auth', credentials);

    return response.data

} 