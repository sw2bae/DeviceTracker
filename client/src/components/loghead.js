import React from "react";

// Depending on the current path, this component sets the "active" className on the appropriate navigation link item
function LogHead({ btnStatus, sortByNum, sortByChar }) {

    return (
        <thead>
            <tr>
                <th scope="col">Log #
    <button type="button" className="btn btn-link" onClick={sortByNum}>{btnStatus.nummode}</button>
                </th>
                <th scope="col" className="align-middle">Date</th>
                <th scope="col" className="align-middle">Time</th>
                <th scope="col" className="align-middle">User ID
                <button type="button" className="btn btn-link" id="userId" onClick={sortByChar}>{btnStatus.userId}</button>
                </th>
                <th scope="col" className="align-middle">Model</th>
                <th scope="col">From
    <button type="button" className="btn btn-link" id="location1" onClick={sortByChar}>{btnStatus.location1}</button>
                </th>
                <th scope="col">To
    <button type="button" className="btn btn-link" id="location2" onClick={sortByChar}>{btnStatus.location2}</button>
                </th>
                <th scope="col" className="align-middle">QTY</th>
            </tr>
        </thead>
    );
}

export default LogHead;
