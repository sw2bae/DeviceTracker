import React, { useEffect, useState } from "react";
import API from "../utils/API";
import Header from "../components/header";
import In from "../components/in";
import Out from "../components/out";


// import { Link, useLocation } from "react-router-dom";

function Main() {

    function dragStart(e) {
        console.log("DragStart");
        e.target.className += " bg-dark text-white";
    };
    function dragEnd(e) {
        console.log("DragEnd");
        e.target.className = "font-weight-bold text-center mt-3 border rounded";
    };
    function dragOver(e) {
        e.preventDefault();
        console.log("DragOver");
    };
    function dragEnter(e) {
        // e.preventDefault();
        console.log("DragEnter");
    };
    function dragLeave(e) {
        // e.preventDefault();
        console.log("DragLeave");
    };
    function dragDrop(e) {
        // e.preventDefault();
        console.log("DragDrop");
    };


    return (
        <>
            <Header />
            <main className="card mt-3">
                <div className=" container">
                    <div className="row">
                        <In onDragStart={dragStart} onDragEnd={dragEnd} onDragOver={dragOver} onDragEnter={dragEnter} onDragLeave={dragLeave} onDragDrop={dragDrop} />
                        <div className="col-sm-1">
                        </div>
                        <Out onDragStart={dragStart} onDragEnd={dragEnd} onDragOver={dragOver} onDragEnter={dragEnter} onDragLeave={dragLeave} onDragDrop={dragDrop} />
                    </div>
                </div>
            </main>
        </>
    );
}

export default Main;
