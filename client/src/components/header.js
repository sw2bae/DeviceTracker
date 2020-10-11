import React, { useEffect, useState } from "react";
import API from "../utils/API";
import { Link } from 'react-router-dom';

// import { Link, useLocation } from "react-router-dom";

function Header() {

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
            <nav className="bg-info navbar sticky-top rounded-0 navbar-expand-md p-sm-3 font-weight-bold mx-auto">
                <div className="text-white ml-sm-3">
                    <Link className="btn btn-info  p-0 pr-1 pl-1 pb-1" to='/main'><h2>🎨 Palette</h2>
                        <h5 className="mb-0">Welcome [{currentUser.userId}]</h5></Link>
                </div>

                <a className="navbar-toggler text-white" data-toggle="collapse" href="#" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fas fa-bars"></i>
                </a>

                <div className="collapse navbar-collapse flex-column " id="navbarSupportedContent">
                    <ul className="row pl-0 d-flex justify-content-between align-items-center mb-0">
                        <Link className="nav-item btn btn-info col-md text-center pr-5 pl-5 mr-md-5 ml-md-5" id="O1" to="/O1"><h5>O1</h5></Link>
                        <Link className="nav-item btn btn-info col-md text-center pr-5 pl-5 mr-md-5 ml-md-5" id="T2" to="/T2"><h5>T2</h5></Link>
                        <Link className="nav-item btn btn-info col-md text-center pr-5 pl-5 mr-md-5 ml-md-5" id="P3" to="/P3"><h5>P3</h5></Link>
                        <Link className="nav-item btn btn-info col-md text-center pr-5 pl-5 mr-md-5 ml-md-5" to='/log'><h5>Log</h5></Link>
                    </ul>
                </div>

            </nav>
        </>
    );
}

export default Header;
