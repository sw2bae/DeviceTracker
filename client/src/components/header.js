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
                    <div className="btn-group">
                        <Link type="button" className="btn btn-info ml-3" to='/main'>Main</Link>
                        <button type="button" className="btn btn-info dropdown-toggle dropdown-toggle-split  col-2-sm mr-3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="sr-only">Toggle Dropdown</span>
                        </button>
                        <div className="dropdown-menu">
                            <Link className="dropdown-item" id="O1" to="/O1">O1</Link>
                            <Link className="dropdown-item" id="T2" to="/T2">T2</Link>
                            <Link className="dropdown-item" id="P3" to="/P3">P3</Link>
                        </div>
                    </div>
                    <Link className="btn btn-info col-2-sm mr-3" to='/log'>Log</Link>
                    <button type="button" className="btn btn-info col-2-sm" onClick={handleLogout}>Log Out</button>
                </div>
            </header>
        </>
    );
}

export default Header;
