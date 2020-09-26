import React, { useState, useEffect } from "react";
import API from "../utils/API";
// import { useUserContext } from "../../utils/userContext";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function LogBody() {


    const [logData, setLogData] = useState([]);

    const fetchData = async () => {
        const data = await API.logRead();
        setLogData(data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    console.log(logData);

    return (
        <tbody>
            {logData.reverse().map((log, index) => {
                return (
                    <tr key={index}>
                        <td>{log.createdAt.substring(0, 10)}</td>
                        <td>{log.id}</td>
                        <td>{log.logInId}</td>
                        <td>{log.location_1}</td>
                        <td>{log.location_2}</td>
                        <td>{log.qty}</td>
                    </tr>
                )
            })}
        </tbody>
    );

}

export default LogBody;