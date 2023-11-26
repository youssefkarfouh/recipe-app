import React, { useState } from 'react'
import useAxiosPrivate from '../hooks/usePrivateAxios'
import { useLocation, useNavigate } from 'react-router-dom';

function Employees() {

    const navigate = useNavigate();
    const location = useLocation();

    const [employeees, setEmployees] = useState([])
    const axiosPrivate = useAxiosPrivate();

    const getEmployees = async () => {

        try {

            const response = await axiosPrivate.get(`/employees`);
            setEmployees(response.data);

        } catch (error) {

            navigate("/login", { state: { replace: true, from: location } })
            alert(error)
        }


    }

    return (
        <>
            <div>Employees</div>
            <button onClick={getEmployees}>getAll Employees</button>

            <ul>
                {employeees.map(emp => <li>{`${emp.firstname} ${emp.lastname}`}</li>)}
            </ul>
        </>

    )
}

export default Employees