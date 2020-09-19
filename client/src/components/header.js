import React, { useEffect, useState } from "react";
import API from "../utils/API";

// import { Link, useLocation } from "react-router-dom";

function Header() {

    const [btnStatus, setbtnStatus] = useState("main");

    async function handleLogout(event) {
        event.preventDefault();

        await API.logOut();
        window.location.replace("/");
    }

    async function logBtn(event) {
        event.preventDefault();

        // await API.logOut();
        setbtnStatus("log");
        window.location.replace("/log");
    }
    async function mainBtn(event) {
        event.preventDefault();

        // await API.logOut();
        setbtnStatus("main");
        window.location.replace("/main");
    }


    const [currentUser, setCurrentUser] = useState({});
    useEffect(() => {
        const fetchData = async () => {

            const { user } = await API.checkAuth();
            setCurrentUser(user);
        };
        fetchData();
    }, []);

    return (
        <>
            <header className="container mt-3">
                <div className="row">
                    <h3 className="col">Welcome [{currentUser.userId}]</h3>
                    <button type="button" className="btn btn-info col-2-sm mr-3" onClick={handleLogout}>Log Out</button>
                    <button type="button" className="btn btn-danger col-2-sm mr-3" onClick={logBtn}>Log</button>
                </div>
            </header>
        </>
    );
}

export default Header;
