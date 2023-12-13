import React, { useEffect } from 'react'
import axios from '../api/axios'

function Employees() {


    useEffect(() => {

        try {

            const fetchEmpoloyees = async () => {

                const response = await axios.get("/employees");
                console.log("employees", response)
            }

            fetchEmpoloyees()
        }
        catch (err) {
            console.log("error ", err)
        }

    }, [])
    return (
        <div>Employees</div>
    )
}

export default Employees