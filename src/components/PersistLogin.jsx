import React from 'react'

import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useRefreshToken from '../hooks/useRefreshToken'
import useAuth from '../hooks/useAuth'


function PersistLogin() {

    const [isLoading, setIsloading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();


    useEffect(() => {

        const verifyrRefreshToken = async () => {
            try {
                await refresh();

            }
            catch (err) {

            }
            finally {
                setIsloading(false);
            }
        }

        !auth?.accessToken ? verifyrRefreshToken() : setIsloading(false);

    }, [])

    useEffect(() => {
        console.log("persistLogin isloading : ", isLoading);
        console.log(`persistLogin At : ${JSON.stringify(auth?.accessToken)}`);
    }, [])



    return (
        <>
            {isLoading
                ? <p>loading ...</p>
                : <Outlet />
            }
        </>
    )
}
export default PersistLogin