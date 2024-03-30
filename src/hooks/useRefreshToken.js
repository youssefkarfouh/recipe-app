import useAuth from "../hooks/useAuth";
import { axiosPrivate } from "../api/axios";

function useRefreshToken() {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axiosPrivate.get("/refresh");

    setAuth((prev) => {
      return {
        ...prev,
        roles: response.data.roles,
        user: response.data.user,
        accessToken: response.data.accessToken,
      };
    });

    return response.data.accessToken;
  };

  return refresh;
}

export default useRefreshToken;
