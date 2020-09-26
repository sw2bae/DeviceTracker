import React, { useState, useEffect } from "react";
import API from "../utils/API";
import Header from "../components/header";



// import { Link, useLocation } from "react-router-dom";

function Log() {


    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const { user } = await API.checkAuth();
            setCurrentUser(user);
        };
        fetchData();
    }, []);


    function logCreator() {



    }

    return (
        <>
            <Header />
            <main className="card mt-3">
                <p className="container card mt-5 mb-5">
                    Log
                </p>
            </main>
        </>
    );
}

export default Log;
