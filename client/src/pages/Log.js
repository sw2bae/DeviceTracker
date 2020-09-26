import React, { useState, useEffect } from "react";
import API from "../utils/API";
import Header from "../components/header";



// import { Link, useLocation } from "react-router-dom";

function Log() {

    const [currentUser, setCurrentUser] = useState({});
    const [logData, setLogData] = useState();

    const fetchData = async () => {
        const { user } = await API.checkAuth();
        setCurrentUser(user);

        const data = await API.logRead();
        setLogData(data);
    };


    useEffect(() => {
        fetchData();
    }, []);


    console.log(logData);

    return (
        <>
            <Header userId={currentUser.userId} />
            <main className="card mt-3">
                <p className="container card mt-5 mb-5">
                    Log
                </p>
            </main>
        </>
    );
}

export default Log;
