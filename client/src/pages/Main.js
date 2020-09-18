import React, { useState } from "react";
import API from "../utils/API";
import In from "../components/in";
import Out from "../components/out";


// import { Link, useLocation } from "react-router-dom";

function Main() {


    return (
        <main className="card mt-5">
            <In />
            <Out />
        </main>
    );
}

export default Main;
