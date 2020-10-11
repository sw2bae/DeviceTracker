import React, { useState } from "react";
import API from "../utils/API";


import { Link, useLocation } from "react-router-dom";

function LogIn() {
    const [loginUnauth, setLoginUnauth] = useState("none");

    function logInHandler(event) {
        event.preventDefault();

        API.logIn({
            userId: event.target.userId.value,
            password: event.target.password.value
        })
            .then(() => {
                window.location.replace("/main");
            })
            .catch(() => {
                setLoginUnauth("block");
            });
    }

    return (
        <main className="container card bg-info text-white mt-5 border-0">
            <h1 className="text-center mt-3 mb-3">MQL-KS</h1>

            <form onSubmit={logInHandler}>
                <div className="form-group">
                    <label for="userId">User ID</label>
                    <input type="text" className="form-control" name="userId" id="userId"></input>
                </div>
                <div className="form-group">
                    <label for="password">Password</label>
                    <input type="password" className="form-control" name="password" id="password"></input>
                </div>
                <button type="submit" className="btn btn-secondary mb-5">Log In</button>
            </form>
            <p className="text-center alert alert-info font-weight-bold" role="alert" style={{ display: loginUnauth }}>ID and Password pair not found</p>

            <div>
                <nav className="navbar fixed-bottom bg-info mt-5 rounded-0" id="footer">
                    <a className="navbar-brand text-white mx-auto m-0 p-2" href="mailto:sw2.bae@samsung.com" >Contact : sw2.bae@samsung.com</a>
                </nav>
            </div>
        </main>
    );
}

export default LogIn;
