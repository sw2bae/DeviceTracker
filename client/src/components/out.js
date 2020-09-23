import React from "react";
// import { Link, useLocation } from "react-router-dom";

function Out({ onDragStart, onDragEnd, onDragOver, onDragEnter, onDragLeave, onDragDrop }) {

    return (
        <main className="card mt-5 mb-5 col-sm" onDragOver={onDragOver} onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDrop={onDragDrop} id="OutBound">
            Out
        </main>
    )
}

export default Out;
