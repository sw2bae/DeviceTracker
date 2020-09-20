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
                <div className=" container">
                    <div className="row">
                        <In />
                        <div className="col-sm-1">
                        </div>
                        <Out />
                    </div>
                </div>
            </main>
        </>
    );
}

export default Main;
