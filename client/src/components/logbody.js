import React, { useState, useEffect } from "react";
import API from "../utils/API";
// import { useUserContext } from "../../utils/userContext";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function LogBody({ logData }) {

    return (
        <tbody>
            {logData.reverse().map((log, index) => {
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