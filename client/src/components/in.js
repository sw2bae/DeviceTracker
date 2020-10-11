import React from "react";
import { useLocationContext } from "../utils/LocationContext";

function In({ onDragStart, onDragEnd, onDragOver, onDragEnter, onDragLeave, onDragDrop, plusBtn, minusBtn }) {

    const inventory = useLocationContext();
    var para = document.location.href.split("/");
    const currentModel = para[3];
    return (
        <main className="card mt-sm-5 mb-sm-5 col-sm-2">

            <h1 className="font-weight-bold text-center mt-1 mb-sm-3">{currentModel}</h1>
            <p className="font-weight-bold text-center mt-1 mb-1 border rounded" draggable="true" id="Aging Room" onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver} onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDrop={onDragDrop}  >Aging Room</p>
            <div className="container">
                <div className="row">
                    <button type="button" class="btn btn-outline-info mt-3 mb-3 col" onClick={plusBtn} value="Aging Room">+</button>
                    <div className="col-1" />
                    <button type="button" class="btn btn-outline-primary mt-3 mb-3 col" onClick={minusBtn} value="Aging Room">-</button>
                </div>
            </div>
            <h1 className="text-center mt-sm-3 mb-sm-5">{inventory["Aging Room"]}</h1>

        </main>
    )
}

export default In;
