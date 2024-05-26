import { useEffect, useState } from "react";

function useAxios() {

    const [response, setResponse] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [controller, setController] = useState();

    const axiosFetch = async (configObj) => {
        const { axiosInstance, method, url, requestConfig = {} } = configObj;

        try {
            const ctrl = new AbortController();
            setController(ctrl);
            setLoading(true);

            const res = await axiosInstance[method.toLowerCase()](url, {
                ...requestConfig,
                signal: ctrl.signal
            });
            setResponse(res.data);
        } catch (err) {
            console.error(err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        console.log("controller", controller)
        // useEffect cleanup function
        return () => controller && controller.abort();

    }, [controller]);


    return [response, error, loading, axiosFetch];
}

export default useAxios