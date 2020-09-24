import React from "react";
import { useLocationContext } from "../utils/LocationContext";

function In({ onDragStart, onDragEnd, onDragOver, onDragEnter, onDragLeave, onDragDrop, plusBtn, minusBtn }) {

    const inventory = useLocationContext();

    return (
        <main className="card mt-5 mb-5 col-sm-2">
            <p className="font-weight-bold text-center mt-3 border rounded" draggable="true" id="Aging Room" onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver} onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDrop={onDragDrop}  >Aging Room</p>
            <div className="container">
                <div className="row">
                    <button type="button" class="btn btn-outline-info mb-3 col" onClick={plusBtn} value="Aging Room">+</button>
                    <div className="col-1" />
                    <button type="button" class="btn btn-outline-primary mb-3 col" onClick={minusBtn} value="Aging Room">-</button>
                </div>
            </div>
            <h1 className="text-center">{inventory["Aging Room"]}</h1>

        </main>
    )
}

export default In;
