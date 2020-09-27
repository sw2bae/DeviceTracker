import React, { useState, useEffect } from "react";
import API from "../utils/API";
// import { useUserContext } from "../../utils/userContext";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function LogBody() {


    const [logData, setLogData] = useState([]);
    const [filteredLog, setFilteredLog] = useState([]);

    const fetchData = async () => {
        let logs = [];
        const data = await API.logRead();

        for (let i = 0; i < data.length; i++) {
            let log = {
                id: data[i].id,
                data: data[i].date,
                time: data[i].time,
                userId: data[i].logInId,
                location1: data[i].location_1,
                location2: data[i].location_2,
                qty: data[i].qty
            };
            logs.push(log);
        };
        setLogData(logs);
        setFilteredLog(logs);
    };
    // console.log(logData);

    useEffect(() => {
        fetchData();
    }, []);

    // console.log(logData);

    return (
        <tbody>
            {logData.reverse().map((log, index) => {
                // console.log(new Date(log.updatedAt));
                return (
                    <tr key={index}>
                        <td>{log.id}</td>
                        <td>{log.data}</td>
                        <td>{log.time}</td>
                        <td>{log.userId}</td>
                        <td>{log.location1}</td>
                        <td>{log.location2}</td>
                        <td>{log.qty}</td>
                    </tr>
                )
            })}
        </tbody>
    );

}

export default LogBody;