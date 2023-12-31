import React, { useEffect } from 'react'
import useAxiosPrivate from '../hooks/usePrivateAxios';
import { useLocation, useNavigate } from 'react-router-dom';

function Employees() {


    const location = useLocation();
    const navigate = useNavigate();

    const axiosPrivate = useAxiosPrivate();

    const getEmployees = async () => {

        try {

            const response = await axiosPrivate.get("/employees");
            console.log("employees", response)
        }
        catch (err) {
            console.log("error in employess catch ", err)
            // navigate('/login', { state: { from: location } })
        }

    }



    return (
        <button onClick={getEmployees}>getEmplpoyess</button>
    )
}

export default Employees