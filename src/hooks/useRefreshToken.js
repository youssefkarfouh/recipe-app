import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

function useRefreshToken() {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });

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
