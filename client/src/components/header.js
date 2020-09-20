import React, { useEffect, useState } from "react";
import API from "../utils/API";
import { Link } from 'react-router-dom';

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
            <header className="container mt-3">
                <div className="row">
                    <h3 className="col-sm">Welcome [{currentUser.userId}]</h3>
                    <Link className="btn btn-primary col-2-sm mr-3" to='/main'>Main</Link>
                    <Link className="btn btn-danger col-2-sm mr-3" to='/log'>Log</Link>
                    <button type="button" className="btn btn-info col-2-sm" onClick={handleLogout}>Log Out</button>
                </div>
            </header>
        </>
    );
}

export default Header;
