import React, { useEffect, useState } from "react";
import API from "../utils/API";

// import { Link, useLocation } from "react-router-dom";

function Header() {

    async function handleLogout(event) {
        event.preventDefault();

        await API.logOut();
        window.location.replace("/");
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
            <header className="container">
                <p className="mt-3">Welcome [{currentUser.userId}]</p>
                <button type="button" className="" onClick={handleLogout}>Log Out</button>
            </header>
        </>
    );
}

export default Header;
