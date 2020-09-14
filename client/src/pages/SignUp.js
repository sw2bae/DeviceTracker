import React, { useState } from "react";
import API from "../utils/API"

function SignUp() {
    const [passwordErrorVis, setPasswordErrorVis] = useState("none");
    const [passwordLengthVis, setPasswordLengthVis] = useState("none");

    function submitHandler(event) {
        event.preventDefault();

        // Check each condition, email format, password length, and password matching
        // individually in regards to displaying error messages

        if (event.target.password.value.length < 6) {
            console.log(event.target.password.value);
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
        <main className="container card mt-5">
            <h1 className="text-center mt-3 mb-3">MQL-KS</h1>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label for="userId">User ID</label>
                    <input type="email" className="form-control" name="userId" id="userId"></input>
                </div>
                <div className="form-group">
                    <label for="password">Password</label>
                    <input type="password" className="form-control mb-3" name="password" id="password"></input>
                    <label for="password">Confirm Password</label>
                    <input type="password" className="form-control" name="password2" id="password2"></input>
                </div>
                <button type="submit" className="btn btn-outline-success mb-5">Submit</button>
            </form>
        </main>
    );
}

export default SignUp;


