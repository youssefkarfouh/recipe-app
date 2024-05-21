import { axiosBackend } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const useaxiosBackend = () => {
  const refresh = useRefreshToken();
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const requestIntercept = axiosBackend.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseIntercept = axiosBackend.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        console.log("prevRequest", prevRequest);

        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          console.log("private axios refresh called");

          try {
            const newAccessToken = await refresh();
            prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          } catch (err) {
            console.log("err?.response?.status ", err);
            if (err?.response?.status === 430) {
              setAuth({});
              navigate("/login");
            }
          }

          return axiosBackend(prevRequest);
        }
        if (error?.response?.status === 430) {
          navigate("/login");
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosBackend.interceptors.request.eject(requestIntercept);
      axiosBackend.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosBackend;
};

export default useaxiosBackend;
