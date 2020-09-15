import React, { useState } from "react";
import API from "../utils/API";


// import { Link, useLocation } from "react-router-dom";

function LogIn() {
    const [loginUnauth, setLoginUnauth] = useState("none");

    function logInHandler(event) {
        event.preventDefault();
        API.logIn({
            userId: event.target.userId.value,
            password: event.target.password.value
        })
            .then(() => {
                window.location.replace("/home");
                console.log("success");
            })
            .catch(() => {
                setLoginUnauth("block");
            });
    }

    return (
        <main className="container card mt-5">
            <h1 className="text-center mt-3 mb-3">MQL-KS</h1>

            <form onSubmit={logInHandler}>
                <div className="form-group">
                    <label for="userId">User ID</label>
                    <input type="id" className="form-control" name="userId" id="userId"></input>
                </div>
                <div className="form-group">
                    <label for="password">Password</label>
                    <input type="password" className="form-control" name="password" id="password"></input>
                </div>
                <button type="submit" className="btn btn-outline-info mb-5">Log In</button>
            </form>
            <p className="text-center alert alert-danger" role="alert" style={{ display: loginUnauth }}>Email and password pair not found</p>
        </main>
    );
}

export default LogIn;
