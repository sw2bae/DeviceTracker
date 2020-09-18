import React, { useEffect, useState } from "react";
import API from "../utils/API";
import Header from "../components/header";
import In from "../components/in";
import Out from "../components/out";


// import { Link, useLocation } from "react-router-dom";

function Main() {


    return (
        <>
            <Header />
            <main className="card mt-3">
                <In />
                <Out />
            </main>
        </>
    );
}

export default Main;
