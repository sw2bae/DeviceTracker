import React, { useState, useEffect } from "react";
import API from "../utils/API";
import Header from "../components/header";
import LogHead from "../components/loghead";
import LogBody from "../components/logbody";
import SearchForm from "../components/searchform";


// import { Link, useLocation } from "react-router-dom";

function Log() {

    const [currentUser, setCurrentUser] = useState({});

    const fetchData = async () => {
        const { user } = await API.checkAuth();
        setCurrentUser(user);
    };

    useEffect(() => {
        fetchData();
    }, []);

    function handleSearch() {

    }

    return (
        <>
            <Header userId={currentUser.userId} />
            <main className="card mt-3">
                <div className="container card mt-5 mb-5">
                    <SearchForm handleSearch={handleSearch} />
                    <table className="table table-striped mb-3">
                        <LogHead />
                        <LogBody />
                    </table>
                </div>
            </main>
        </>
    );
}

export default Log;
