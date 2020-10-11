import React from "react";
import API from "../utils/API";
import { Link, useLocation } from "react-router-dom";

function Footer() {

    async function handleLogout(event) {
        event.preventDefault();

        await API.logOut();
        window.location.replace("/");
    }



    return (

        <nav className="navbar fixed-bottom bg-info mt-5 rounded-0 row d-flex pr-4 pl-4" id="footer">
            <Link className="btn btn-info navbar-brand text-white mx-auto pb-2 col" onClick={handleLogout} >Log Out</Link>
        </nav>


    )
}

export default Footer;
