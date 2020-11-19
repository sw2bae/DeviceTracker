import React, { useState } from "react";
import API from "../utils/API"

import { Link } from "react-router-dom";
function SignUp() {
    const [passwordErrorVis, setPasswordErrorVis] = useState("none");
    const [passwordLengthVis, setPasswordLengthVis] = useState("none");
    const [userIdErrorVis, setUserIdErrorVis] = useState("none");

    function submitHandler(event) {
        event.preventDefault();

        // Check each condition, email format, password length, and password matching
        // individually in regards to displaying error messages

        if (event.target.password.value.length < 6) {
            // console.log(event.target.password.value);
            event.target.password.value = "";
            event.target.password2.value = "";
            setPasswordLengthVis("block");
        } else {
            setPasswordLengthVis("none");
        }

        if (event.target.password.value !== event.target.password2.value) {
            event.target.password.value = "";
            event.target.password2.value = "";
            setPasswordErrorVis("block");
        } else {
            setPasswordErrorVis("none");
        }

        // Check conditions together to decide whether to make API call

        if (event.target.password.value.length >= 6 && event.target.password.value === event.target.password2.value) {
            API.signUp({
                userId: event.target.userId.value,
                password: event.target.password.value
            })
                .then(() => {
                    window.location.replace("/");
                })
        }
    }

    return (
        <main className="container bg-info text-white mt-5 rounded p-5 border-0">
            <h1 className="text-center mt-3 mb-3 pb-5">MQL-KS</h1>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label for="userId">User ID</label>
                    <input type="text" className="form-control" name="userId" id="userId"></input>
                </div>
                <div className="form-group">
                    <label for="password">Password</label>
                    <input type="password" className="form-control mb-3" name="password" id="password"></input>
                    <label for="password">Confirm Password</label>
                    <input type="password" className="form-control" name="password2" id="password2"></input>
                </div>
                <div className="mainBtn">
                    <button type="submit" className="btn btn-secondary mt-3 mb-5">Submit</button>
                    <Link to="/" className="btn btn-secondary mt-3 mb-5 ml-5">Back</Link>
                </div>
                <p className="text-center alert alert-info font-weight-bold" role="alert" style={{ display: passwordErrorVis }}>Passwords don't match. Re-enter password</p>
                <p className="text-center alert alert-info font-weight-bold" role="alert" style={{ display: passwordLengthVis }}>Password must contain at least 6 characters</p>
                <p className="text-center alert alert-info font-weight-bold" role="alert" style={{ display: userIdErrorVis }}>User ID Already Exists</p>
            </form>
            <div>
                <nav className="navbar fixed-bottom bg-info mt-5 rounded-0" id="footer">
                    <a className="navbar-brand text-white mx-auto m-0 p-2" href="mailto:sw2.bae@samsung.com" >Contact : sw2.bae@samsung.com</a>
                </nav>
            </div>
        </main>
    );
}

export default SignUp;


